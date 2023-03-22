import MyError from "../exception";
import { REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";

/**
 * 随机生成四位验证码
 *
 * @return string 四位验证码（可以以0开头）
 */
export function generateRandomFourDigitNumber(): string {
    const min = 0;
    const max = 9999;
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    const result = random.toString().padStart(4, '0');
    return result;
}

export function validatePhoneNum(phoneNum: string): boolean {
    const phoneRegex = /^1[3456789]\d{9}$/;
    if (!phoneRegex.test(phoneNum)){
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "手机号非法");
    }
    return true;
}
