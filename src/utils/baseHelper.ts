import MyError from "../exception";
import { HTTP_STATUS_CODE, REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";
import redisClient from "../cache";

/**
 * 随机生成四位验证码
 *
 * @return string 四位验证码（可以以0开头）
 */
export function generateRandomFourDigitNumber(): string {
  const min = 0;
  const max = 9999;
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  const result = random.toString().padStart(4, "0");
  return result;
}

export function validatePhoneNum(phoneNum: string): boolean {
  const phoneRegex = /^1[3456789]\d{9}$/;
  if (!phoneRegex.test(phoneNum)) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "手机号非法");
  }
  return true;
}

//TODO 修一修
export function validateToken(token: string) {
  let result: string | null = null;
  if (!token) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "token非法");
  }
  redisClient.get(token, (err, reply) => {

    while (reply === null) {
      // 等待 RedisClient.get() 完成
    }
    if (err) {
      throw new MyError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, "服务器错误");
    }
    if (!reply) {
      throw new MyError(REQUEST_PARAMS_ERROR_CODE, "token非法");
    }
    result = reply;
  });
  return result;
}
