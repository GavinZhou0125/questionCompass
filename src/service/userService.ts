import redisClient from "src/cache";
import { SendSmsResponse } from "src/modelAndView/User";
import { generateRandomFourDigitNumber, validatePhoneNum } from "src/utils/baseHelper";
import MyError from "../exception";
import { NOT_FOUND_ERROR_CODE, REQUEST_PARAMS_ERROR_CODE, SYSTEM_ERROR_CODE } from "../exception/errorCode";
import { Op } from "sequelize";
import UserModel from "../model/user";
import SMSClient from "../thirdParty/SMS/sms";
import md5 from "md5";
import { v4 } from "uuid";
import FileModel from "../model/fileTable";
import QuestionModel from "../model/questionTable";
import sequelize from "../db";

// 密码加盐
const SALT = "coder_zxy";

/**
 * 获取验证码
 * @param mobile 手机号
 * @param changePhoneNum 是否是更换手机号
 * @return {Promise<boolean>}
 */
export async function userGetCaptcha(mobile:string,changePhoneNum:boolean) {
  // 校验
  validatePhoneNum(mobile);
  // 校验手机号是否已被注册
  if (!changePhoneNum) {
    let user = await UserModel.findOne({
      where: {
        [Op.or]: [{ mobile }]
      }
    });
    if (user) {
      throw new MyError(REQUEST_PARAMS_ERROR_CODE, "该手机号已被注册");
    }
  }
  // 生成验证码
  let captcha: string = generateRandomFourDigitNumber();
  // 生成验证码对应的uuid
  const captchaUuid: string = v4();
  // 存入redis
  redisClient.set(captchaUuid, captcha, "EX", 60 * 60);
  // 发送短信
  await SMSClient.main(process.argv.slice(2), mobile, "问答校园", "SMS_271405583", `{\"code\":\"${captcha}\"}`);

  return new SendSmsResponse(captchaUuid, "短信验证码发送成功");
}


export async function userVerifyName(name) {
  let user = await UserModel.findOne({
    where: {
      [Op.or]: [{ name }]
    }
  });
  if (user) {
    return "用户名已存在";
  }
  return "ok";
}


/**
 * 用户注册
 * @param name 用户名
 * @param password 密码
 * @param mobile 手机号
 * @param captchaUuid 验证码uuid
 * @param captcha 验证码
 * @return {Promise<boolean>} 注册成功返回true
 */
export async function userRegister(name, password, mobile, captchaUuid, captcha) {
  // 校验
  if (!name || !password || !mobile || !captchaUuid || !captcha) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  if (name.length > 32) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "用户名过长");
  }
  validatePhoneNum(mobile);
  redisClient.get(captchaUuid, (err, reply) => {
    if (err) {
      throw new MyError(SYSTEM_ERROR_CODE, "验证码校验错误或已过期");
    }
    if (reply !== captcha) {
      throw new MyError(REQUEST_PARAMS_ERROR_CODE, "验证码错误");
    }
  });
  // 用户是否已存在
  let user = await UserModel.findOne({
    where: {
      [Op.or]: [{ name }, { mobile }]
    }
  });
  if (user) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "该用户名或手机号已被注册");
  }
  // 插入新用户
  const cryptoPassword = md5(password + SALT).toString();
  console.log(cryptoPassword);
  user = await UserModel.create({
    name,
    password: cryptoPassword,
    mobile,
    creator: name
  });
  return user.getDataValue("id");
}

/**
 * 用户注册
 * @param name 用户名
 * @param password 密码
 * @param mobile 手机号
 * @param captchaUuid 验证码uuid
 * @param captcha 验证码
 * @return {Promise<boolean>} 注册成功返回true
 */
export async function userChangeMobile(id, mobile, captchaUuid, captcha) {
  // 校验
  if (!id || !mobile || !captchaUuid || !captcha) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  validatePhoneNum(mobile);
  await redisClient.get(captchaUuid, (err, reply) => {
    if (err) {
      throw new MyError(SYSTEM_ERROR_CODE, "验证码校验错误或已过期");
    }
    if (reply !== captcha) {
      throw new MyError(REQUEST_PARAMS_ERROR_CODE, "验证码错误");
    }
  });
  // 用户是否已存在
  let user = await UserModel.findOne({
    where: {
      [Op.or]: [{ id }, { mobile }]
    }
  });
  if (!user) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "用户不存在");
  }
  user.set("mobile", mobile);
  await user.save();
  return user.getDataValue("id");
}


/**
 * 用户登录
 * @param mobile 手机号
 * @param password 密码
 */
export async function userLogin(mobile, password) {
  UserModel.belongsTo(FileModel, { foreignKey: "head_img", targetKey: "file_id" });

  // 校验
  validatePhoneNum(mobile);
  const user = await UserModel.findOne({
    where: { mobile: mobile },
    include: [FileModel]
  });
  if (!user) {
    throw new MyError(NOT_FOUND_ERROR_CODE, "该手机号未注册");
  }
  if (user.get("password") !== md5(password + SALT).toString()) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "密码错误");
  }
  const sessionId = v4();
  redisClient.set(sessionId, user.get("id"));

  // 默认10分钟过期
  redisClient.expire(sessionId, 60 * 10);
  const res = {
    id: user.get("id"),
    name: user.get("name"),
    avatar: user.get("file_table"),
    token: sessionId
  };
  return res;
}


export async function userLogout(sessionId) {
  redisClient.del(sessionId);
  return "see you";
}

export async function userChangeAvatar(fileId, auth) {
  let user = await UserModel.findOne({
    where: {
      id: Number.parseInt(auth)
    }
  });
  if (!user) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "用户不存在");
  }
  user.set("head_img", Number.parseInt(fileId));
  user.save();
  return "ok";
}

export async function queryUser(auth) {
  UserModel.belongsTo(FileModel, { foreignKey: "head_img", targetKey: "file_id" });
  UserModel.hasMany(QuestionModel, { foreignKey: "problem_id", sourceKey: "creator" });
  let user = await UserModel.findOne({
    where: {
      id: Number.parseInt(auth)
    },
    include: [{ model: FileModel }],
    attributes:{
      include: [
        [sequelize.literal(`(SELECT COUNT(*) FROM question_table WHERE question_table.creator = user.id AND problem_answer_id IS NULL )`), 'question_count'],
        [sequelize.literal(`(SELECT COUNT(*) FROM question_table WHERE question_table.creator = user.id AND problem_answer_id IS not NULL)`), 'answer_count'],
        [sequelize.literal(`(SELECT SUM(problem_reputation) FROM question_table WHERE question_table.creator = user.id AND problem_answer_id IS NULL)`), 'question_reputation']
      ]
    }
  });
  if (!user) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "用户不存在");
  }
  user.set("mobile", user.get("mobile").toString().substring(0, 3) + "****" + user.get("mobile").toString().substring(7, 11));
  return user;
}
