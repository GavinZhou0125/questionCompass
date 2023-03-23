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
  }
  // 问题相关
  // {
  //   path: "/user/logout",
  //   handler: require("./controller/userController").userLogoutApi,
  // },
  // {
  //   path: "/user/current",
  //   handler: require("./controller/userController").getLoginUserApi,
  // },
  // {
  //   path: "/music/get",
  //   handler: require("./controller/musicController").getSingleMusicApi,
  // },
  // {
  //   path: "/music/list/hot",
  //   handler: require("./controller/musicController").getPlaylistDetailApi,
  // },
  // {
  //   path: "/fanyi/translate",
  //   handler: require("./controller/fanyiController").translateApi,
  // },
  // {
  //   path: "/background/get/random",
  //   handler: require("./controller/backgroundController")
  //     .getRandomBackgroundApi,
  // },
];

export default routes;
