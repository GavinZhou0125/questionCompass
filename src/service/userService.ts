import redisClient from "src/cache";
import {SendSmsResponse} from "src/modelAndView/User";
import {generateRandomFourDigitNumber} from "src/utils/baseHelper";
import {uuid} from "uuidv4";
import MyError from "../exception";
import { REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";
import { Op } from "sequelize";
import { md5 } from "kitx";
import UserModel from "../model/user";
import SMSClient from "../thirdParty/SMS/sms";

// 密码加盐
const SALT = "coder_zxy";

/**
 * 获取验证码
 * @param mobile
 * @return {Promise<boolean>}
 */
export async function userGetCaptcha(mobile) {
  // 校验
  const phoneRegex = /^1[3456789]\d{9}$/;
  if (!phoneRegex.test(mobile)) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "手机号非法");
  }
  let user = await UserModel.findOne({
    where: {
      [Op.or]: [{ mobile }]
    }
  });
  if (user) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "该手机号已被注册");
  }
  // 生成验证码
  let captcha = generateRandomFourDigitNumber();
  // 生成验证码对应的uuid
  const captchaUuid = uuid();
  // 存入redis
  redisClient.set(captchaUuid, captcha, "EX", 60 * 5);
  // 发送短信
  // await SMSClient.main(process.argv.slice(2), mobile, "问答校园", "SMS_271405583", `{\"code\":\"${captcha}\"}`)

  return new SendSmsResponse(captchaUuid, "短信验证码发送成功");
}


/**
 * 用户注册
 * @param username
 * @param password
 * @param mobile
 * @param captchaId
 * @param captcha
 * @return {Promise<boolean>}
 */
export async function userRegister(username, password, mobile, captchaId, captcha) {
  // 校验
  if (!username || !password || !mobile || !captchaId || !captcha) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  if (username.length > 32) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "用户名过长");
  }
  const phoneRegex = /^1[3456789]\d{9}$/;
  if (!phoneRegex.test(mobile)) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "手机号非法");
  }
  // 用户是否已存在
  let user = await UserModel.findOne({
    where: {
      [Op.or]: [{ username }, { mobile }]
    }
  });
  if (user) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "该用户名或邮箱已被注册");
  }
  // 插入新用户
  const cryptoPassword = md5(password + SALT);
  user = await UserModel.create({
    username,
    password: cryptoPassword,
    mobile
  });
  return user.getDataValue("id");
}



