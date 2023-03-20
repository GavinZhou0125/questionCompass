export const routes = [
  {
    method: "GET",
    path: "/user/test",
    handler: require("./controller/userController").userTestApi,
  },
  {
    method: "POST",
    path: "/user/getCaptcha",
    handler: require("./controller/userController").userGetCaptchaApi,
  },{
    method: "POST",
    path: "/user/register",
    handler: require("./controller/userController").userRegisterApi,
  },
  {
    method: "POST",
    path: "/user/login",
    handler: require("./controller/userController").userLoginApi,
  },
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

export default routes
