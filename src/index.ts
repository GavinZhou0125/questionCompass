import ExpressServer from "./server";
import { routes } from "./routes";


// 创建云托管 Server 实例
const server = new ExpressServer();

// 注册接口路由
for (const route of routes) {
  server.setRoute(route.path, route.handler, route.method,route.security);
}


// 监听端口
server.listen(7345);
