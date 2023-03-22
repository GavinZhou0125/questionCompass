import { REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";
import MyError from "../exception";
import { userGetCaptcha, userLogin, userRegister, userVerifyName } from "../service/userService";

/**
 * 获取验证码
 * @param event 请求参数
 * @param req 请求体
 * @param res 相应体
 */
export async function userGetCaptchaApi(event, req, res) {
  const { mobile } = event;
  if (!mobile) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "缺少手机号");
  }
  return await userGetCaptcha( mobile );
}

/**
 * 用户登录
 * @param event 请求参数
 * @param req 请求体
 * @param res 相应体
 */
export async function userVerifyNameApi(event, req, res){
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
 * @param res 相应体
 */
export async function userTestApi( event, req, res) {
  return userGetCaptcha( "18941330125" );
}


/**
 * 用户注册
 * @param event 请求参数
 * @param req 请求体
 * @param res 相应体
 */
export async function userRegisterApi(event, req, res) {
  const { username, password, mobile, captchaUuid, captcha } = event;
  if (!username || !password || !mobile || !captchaUuid || !captcha) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userRegister(username, password, mobile, captchaUuid, captcha);
}

/**
 * 用户登录
 * @param event 请求参数
 * @param req 请求体
 * @param res 相应体
 */
export async function userLoginApi(event, req, res) {
  const { mobile, password } = event;
  if (!mobile || !password) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userLogin(mobile, password);
}
