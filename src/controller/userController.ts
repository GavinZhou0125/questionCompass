import { REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";
import MyError from "../exception";
import { userGetCaptcha, userRegister, userVerifyName } from "../service/userService";

/**
 * 获取验证码
 * @param event
 * @param req
 * @param res
 */
export async function userGetCaptchaApi(event, req, res) {
  const { mobile } = event;
  if (!mobile) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "缺少手机号");
  }
  return await userGetCaptcha( mobile );
}


export async function userVerifyNameApi(event, req, res){
  const { username } = event;
  if (!username) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "缺少用户名");
  }
  return await userVerifyName(username);
}

/**
 * 测通
 * @param event
 * @param req
 * @param res
 */
export async function userTestApi( event, req, res) {
  return await userGetCaptcha("13685208896");
}


/**
 * 用户注册
 * @param event
 * @param req
 * @param res
 */
export async function userRegisterApi(event, req, res) {
  const { username, password, mobile, captchaId, captcha } = event;
  if (!username || !password || !mobile || !captchaId || !captcha) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userRegister(username, password, mobile, captchaId, captcha);
}
