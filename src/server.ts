import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import redisClient from "src/cache";
import bodyParser from "body-parser";
import http from "http";
import { FORBIDDEN_ERROR_CODE, HTTP_STATUS_CODE } from "./exception/errorCode";
import MyError from "./exception";
import expressSession from "express-session";
import connectRedis from "connect-redis";
import * as console from "console";
import upload from "./middleware/upload";
import { devConfig } from "./config/config";
import * as path from "path";
import { validateToken } from "./utils/baseHelper";
// const cors = require('cors');
import cors from "cors"

const RedisStore = connectRedis(expressSession);


//请求大小限制
const requestLimit = "5120kb";

class ExpressServer {
  readonly app: any;
  private contextPath: string;
  private server: Application<Request, Response>;


  constructor() {
    this.app = express();

    //上下文请求路径
    this.contextPath = "/api";
    this.app.use(morgan("short"));
    this.app.use(bodyParser.json({ limit: requestLimit }));
    this.app.use(cors())
    this.app.use("/upload",express.static(path.join(__dirname, devConfig.upload.requestPath)));
    //debug 使用 form-data 方式传参
    // this.app.use(bodyParser.urlencoded({ limit: requestLimit }));
    // 禁用技术头
    this.app.set("x-powered-by", false);
    this.app.all("*", (req, res, next) => {
      // 开启跨域
      res.setHeader("Access-Control-Allow-Credentials", "true");

        //获取请求头
        let kHeaderSymbol = Object.getOwnPropertySymbols(req).find((s) => s.toString().match(/kHeaders/));
        const headers = req[kHeaderSymbol];

        const origin = headers.origin;
        // 允许的地址 http://127.0.0.1:9000 这样的格式
        if (origin) {
          res.setHeader("Access-Control-Allow-Origin", origin);
        }
        // 允许跨域请求的方法
        res.setHeader(
          "Access-Control-Allow-Methods",
          "POST, GET, OPTIONS, DELETE, PUT"
        );
        // 允许跨域请求 header 携带哪些东西
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Authorization ,Content-Type, Accept, If-Modified-Since"
        );
        next();
      });
    const sessionOptions = {
      // store session存储实例，默认为一个新的 MemoryStore 实例。
      store: new RedisStore({ client: redisClient }), // 只需设置这个就可存储到redis
      name: "session_id", // 默认connect.sid
      secret: "QC", // 设置签名秘钥  内容可以任意填写
      resave: false, // 强制保存，如果session没有被修改也要重新保存,默认true(推荐false)
      saveUninitialized: true, // 如果原先没有session那么就设置，否则不设置(推荐true)
      rolling: true, // 每次请求更新有效时长
      cookie: {
        // domain: ".yuindex.com", // 需要共享 cookie 时再设置
        // 全局设置 cookie，就是访问随便 api 就会设置 cookie，也可以在登录的路由下单独设置
        maxAge: 1000 * 60 , // 1 小时后过期
        httpOnly: true // 是否允许客户端修改 cookie（默认 true 不能被修改）
      }
    };
    this.app.use(expressSession(sessionOptions));
    this.server = http.createServer(this.app);
  }

  setRoute(path, handlerFunction, routeMethod, routeSecurity) {
    const handler = async (req, res) => {
      // IP 过滤
      const requestClientIp = getClientIp(req);

      if (!requestClientIp) {
        return FORBIDDEN_ERROR_CODE;
      }
      let event = null;


      if (routeMethod === "GET") {
        event = req.query;
      } else if (routeMethod === "POST") {
        event = req.body;
      }
      const token = req.headers.authorization;
      event.token = token;
      let result;

      // debug 如果拿不到authorization，可以尝试用下面的方式拿
      // let kHeaderSymbol = Object.getOwnPropertySymbols(req).find((s) => s.toString().match(/kHeaders/));
      // const headers = req[kHeaderSymbol];

      // 需要登录
      if (routeSecurity) {
        // 没有登陆过
        if (!req.headers.authorization) {
          result = {
            code: HTTP_STATUS_CODE.UNAUTHORIZED,
            data: "请先登录"
          };
          // 登录过
        } else {
          // 校验登录状态
          await redisClient.getAsync(token).then((data) => {
            if (data) {
              event.auth = JSON.parse(data);
              req.auth = JSON.parse(data);

              // 将这个token延长5分钟
              redisClient.expire(token, 60 * 5);
            } else {
              result = {
                code: HTTP_STATUS_CODE.UNAUTHORIZED,
                data: "登录已过期"
              };
            }
          });
        }
        if (result != undefined){
          res.send(result) ;
          return ;
        }
      }

      try {
        const startTime = new Date().getTime();
        let params;
        if (event.file) {
          let eventCopy = { ...event };
          eventCopy.file = undefined;
          params = JSON.stringify(eventCopy);
        } else {
          params = JSON.stringify(event);
        }
        console.log(
          `req start path = ${req.path}, 
          clientIp = ${requestClientIp}, 
          method = ${req.method}, 
          params = ${params}`
        );
        result = await handlerFunction(event, req, res);
        // 封装响应
        result = {
          code: 200,
          data: result
        };
        console.log(
          `req end path = ${req.path}, 
          clientIp = ${requestClientIp},
          method = ${routeMethod}, 
          params = ${params}, 
          costTime = ${new Date().getTime() - startTime}`
        );
      } catch (e) {
        // 全局异常处理
        if (e instanceof MyError) {
          result = {
            code: e.code,
            message: e.message,
            data: null
          };
        } else {
          result = {
            code: 500,
            data: null,
            message: "server error"
          };
        }
        console.error(
          `req error path = ${
            req.path
          }, clientIp = ${requestClientIp},method = ${req.method}, params = ${JSON.stringify(event)}`,
          e
        );
      }
      res.send(result);
    };
    if (routeMethod === "POST") {
      this.app.post(this.contextPath + path, upload.single(devConfig.upload.fileName), handler);
    } else if (routeMethod === "GET") {
      this.app.get(this.contextPath + path, handler);
    }
  }


  listen(port) {
    this.server.listen(port);
    let url = `http://localhost:${port}`;
    if (this.contextPath) {
      url += this.contextPath;
    }
    console.log(`服务运行于 ${url}, env = ${process.env.NODE_ENV}`);
  }
}


/**
 * 获取真实客户端 ip
 * @param req
 * @returns {*|string}
 */
function getClientIp(req) {
  if (!req) {
    return "";
  }
  return (
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.connection?.socket?.remoteAddress ||
    req.ip
  );
}


export default ExpressServer;
