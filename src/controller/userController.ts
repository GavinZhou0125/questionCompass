import { REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";
import MyError from "../exception";
import {
  queryUser,
  userChangeAvatar,
  userChangeMobile,
  userGetCaptcha,
  userLogin,
  userLogout,
  userRegister,
  userVerifyName
} from "../service/userService";

/**
 * 获取验证码
 * @param event 请求参数
 * @param req 请求体
 * @param res 响应体
 */
export async function userGetCaptchaWithVerifyApi(event, req, res) {
  const { mobile } = event;
  if (!mobile) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "缺少手机号");
  }
  return await userGetCaptcha(mobile, false);
}

/**
 * 获取验证码
 * @param event 请求参数
 * @param req 请求体
 * @param res 响应体
 */
export async function userGetCaptchaApi(event, req, res) {
  const { mobile } = event;
  if (!mobile) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "缺少手机号");
  }
  return await userGetCaptcha(mobile, true);
}

/**
 * 用户登录
 * @param event 请求参数
 * @param req 请求体
 * @param res 响应体
 */
export async function userVerifyNameApi(event, req, res) {
  const { username } = event;
  if (!username) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "缺少用户名");
  }
  return await userVerifyName(username);
}

/**
 * 测通
 * @param event 请求参数
 * @param req 请求体
 * @param res 响应体
 */
export async function userTestApi(event, req, res) {
  return "pong";
}


/**
 * 用户注册
 * @param event 请求参数
 * @param req 请求体
 * @param res 响应体
 */
export async function userRegisterApi(event, req, res) {
  const { username, password, mobile, captchaUuid, captcha } = event;
  if (!username || !password || !mobile || !captchaUuid || !captcha) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userRegister(username, password, mobile, captchaUuid, captcha);
}

/**
 * 用户注册
 * @param event 请求参数
 * @param req 请求体
 * @param res 响应体
 */
export async function userChangeMobileApi(event, req, res) {
  const { user, mobile, captchaUuid, captcha } = event;
  if (!user || !mobile || !captchaUuid || !captcha) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userChangeMobile(user, mobile, captchaUuid, captcha);
}

export async function userChangeAvatarApi(event, req, res) {
  const { auth, avatar } = event;
  if (!auth || !avatar) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userChangeAvatar(avatar, auth);
}

/**
 * 用户登录
 * @param event 请求参数
 * @param req 请求体
 * @param res 响应体
 */
export async function userLoginApi(event, req, res) {
  const { mobile, password } = event;
  if (!mobile || !password) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userLogin(mobile, password);
}

/**
 * 用户登出
 * @param event 请求参数
 * @param req 请求体
 * @param res 响应体
 */
export async function userLogoutApi(event, req, res) {
  const { token } = event;
  if (token) {
    return userLogout(token);
  }
  return "already logout";
}

export async function queryUserApi(event, req, res) {
  const { auth } = event;
  if (!auth) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await queryUser(auth);
}

export async function queryUserByIdApi(event, req, res) {
  const { user } = event;
  if (!user) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await queryUser(user);
}

