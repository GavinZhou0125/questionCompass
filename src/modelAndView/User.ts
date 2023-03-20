/**
 * SendSmsResponse
 * 请求发送短信验证码返回结果
 */
export class SendSmsResponse {
    uuid: string;
    msg: string;

    constructor(uuid: string, msg: string) {
        this.uuid = uuid;
        this.msg = msg;
    }
}
