import ExpressServer from "../src/server";
import { describe, test } from "@jest/globals";
import request from "supertest";
import routes from "../src/routes";

// 创建云托管 Server 实例
const server = new ExpressServer();
describe("登录系列接口测试", () => {
  beforeAll(() => {
// 注册接口路由
    for (const route of routes) {
      server.setRoute(route.path, route.handler, route.method, route.security);
    }
// 监听端口
    server.listen(7346);
  });
  test("测通", function(done) {
    request(server.app).get("/api/user/test").expect(200, { code: 200, data: "pong" }, done);
  });
  test("登录测试", async function() {
    const data = {
      password: "zbc",
      mobile: "13685208896"
    };

    // // encode data as x-www-form-urlencoded
    // const formData = new URLSearchParams();
    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });
    const res = await request(server.app)
      .post("/api/user/login")
      // .set("Content-Type", "application/x-www-form-urlencoded")
      .send(data)
    expect(res.body.code).toEqual(200);
    expect(res.body.data).toHaveLength(36)
  });
  test("登出测试", function(done) {
    request(server.app).get("/api/user/logout").set("Authorization","adsfafafcadfca").expect(200, { code: 200, data: "see you" }, done);
  });
});

