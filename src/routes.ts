import { addFileApi } from "./controller/fileController";

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
    path: "/user/getCaptcha",
    handler: require("./controller/userController").userGetCaptchaApi
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
    path: "/question/getAllByUser",
    handler: require("./controller/questionController").queryQuestionListByUserApi
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
    path: "/upload",
    handler: require("./controller/fileController").addFileApi
  }
];
export default routes;
