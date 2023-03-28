// This file is auto-generated, don't edit it
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';
import { devConfig } from "../../config/config";
import { THIRD_PART_SERVICE_ERROR_CODE } from "../../exception/errorCode";
import MyError from "../../exception";


export default class SMSClient {

  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(accessKeyId: string, accessKeySecret: string): Dysmsapi20170525 {
    let config = new $OpenApi.Config({
      // 必填，您的 AccessKey ID
      accessKeyId: accessKeyId,
      // 必填，您的 AccessKey Secret
      accessKeySecret: accessKeySecret,
    });
    // 访问的域名
    config.endpoint = `dysmsapi.aliyuncs.com`;
    return new Dysmsapi20170525(config);
  }

  static async main(args: string[], phoneNumbers : string, signName : string, templateCode : string, templateParam : string): Promise<any> {
    // 工程代码泄露可能会导致AccessKey泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html
    let client = SMSClient.createClient(devConfig.smsConfig.accessKeyId, devConfig.smsConfig.accessKeySecret);
    // 发送短信请求
    let sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      phoneNumbers: phoneNumbers,
      signName: signName,
      templateCode: templateCode,
      templateParam: templateParam,
    });
    let runtime = new $Util.RuntimeOptions({ });
    try {
      // 复制代码运行请自行打印 API 的返回值
      const res = await client.sendSmsWithOptions(sendSmsRequest, runtime);
      console.log("短信发送成功"+res);
      if (res.statusCode !== 200 && res.body.message!== "OK"){
        throw new MyError(THIRD_PART_SERVICE_ERROR_CODE,res.body.message);
      }
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
    }
  }

}

