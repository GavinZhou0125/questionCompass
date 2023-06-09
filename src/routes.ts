import { addFileApi } from "./controller/fileController";
import { queryUserByIdApi, userChangeMobileApi, userGetCaptchaWithVerifyApi } from "./controller/userController";
import { queryQuestionListHeatApi, questionReputationChangeApi } from "./controller/questionController";

export const routes = [
  //用户登录注册
  {
    security: false,
    method: "GET",
    path: "/user/test",
    handler: require("./controller/userController").userTestApi
  },
  {
    security: false,
    method: "POST",
    path: "/user/getCaptchaWithVerify",
    handler: require("./controller/userController").userGetCaptchaWithVerifyApi
  },
  {
    security: false,
    method: "POST",
    path: "/user/getCaptcha",
    handler: require("./controller/userController").userGetCaptchaApi
  },
  {
    security: false,
    method: "POST",
    path: "/user/changeMobile",
    handler: require("./controller/userController").userChangeMobileApi
  },
  {
    security: false,
    method: "POST",
    path: "/user/register",
    handler: require("./controller/userController").userRegisterApi
  },
  {
    security: false,
    method: "POST",
    path: "/user/login",
    handler: require("./controller/userController").userLoginApi
  },
  {
    security: false,
    method: "GET",
    path: "/user/verifyName",
    handler: require("./controller/userController").userVerifyNameApi
  },
  {
    security: true,
    method: "GET",
    path: "/user/logout",
    handler: require("./controller/userController").userLogoutApi
  },
  {
    security: true,
    method: "POST",
    path: "/user/changeAvatar",
    handler: require("./controller/userController").userChangeAvatarApi
  },
  {
    security: true,
    method: "GET",
    path: "/user/query",
    handler: require("./controller/userController").queryUserApi
  },
  {
    security: true,
    method: "GET",
    path: "/user/getById",
    handler: require("./controller/userController").queryUserByIdApi
  },
  // 问题相关
  {
    security: true,
    method: "POST",
    path: "/question/add",
    handler: require("./controller/questionController").addQuestionApi
  },
  {
    security: true,
    method: "POST",
    path: "/question/answer",
    handler: require("./controller/questionController").answerQuestionApi
  },
  {
    security: true,
    method: "GET",
    path: "/question/answerList",
    handler: require("./controller/questionController").answerListApi
  },
  {
    security: true,
    method: "POST",
    path: "/question/update",
    handler: require("./controller/questionController").updateQuestionApi
  },
  {
    security: true,
    method: "GET",
    path: "/question/delete",
    handler: require("./controller/questionController").deleteQuestionApi
  },
  {
    security: true,
    method: "GET",
    path: "/question/get",
    handler: require("./controller/questionController").queryQuestionApi
  },
  {
    security: true,
    method: "GET",
    path: "/question/list",
    handler: require("./controller/questionController").queryQuestionListApi
  },
  {
    security: true,
    method: "GET",
    path: "/question/listByHeat",
    handler: require("./controller/questionController").queryQuestionListHeatApi
  },
  {
    security: true,
    method: "GET",
    path: "/question/getAllByUser",
    handler: require("./controller/questionController").queryQuestionListByUserApi
  },
  {
    security: true,
    method: "GET",
    path: "/question/getAllAnswerByUser",
    handler: require("./controller/questionController").queryAnswerListByUserApi
  },
  {
    security: true,
    method: "GET",
    path: "/question/getAllByTag",
    handler: require("./controller/questionController").queryQuestionListByTagApi
  },
  {
    security: true,
    method: "GET",
    path: "/question/getAllByTitle",
    handler: require("./controller/questionController").queryQuestionListByTitleApi
  },
  {
    security: true,
    method: "GET",
    path: "/question/getAllByContent",
    handler: require("./controller/questionController").queryQuestionListByContentApi
  },
  {
    security: true,
    method: "POST",
    path: "/question/like",
    handler: require("./controller/questionController").questionReputationChangeApi
  },
  {
    security: false,
    method: "POST",
    path: "/upload",
    handler: require("./controller/fileController").addFileApi
  },
  {
    security: true,
    method: "POST",
    path: "/log/addVisitLog",
    handler: require("./controller/visitLogContrller").addLog
  }
];
export default routes;
