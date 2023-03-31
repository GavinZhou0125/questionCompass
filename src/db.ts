import { Sequelize } from "sequelize";
import { devConfig } from "./config/config";
import QuestionModel from "./model/questionTable";
import FileModel from "./model/fileTable";
import UserModel from "./model/user";

/**
 * 创建数据库实例
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
  database: devConfig.dbConfig.database,
  username: devConfig.dbConfig.username,
  password: devConfig.dbConfig.password,
  host: devConfig.dbConfig.host,
  port: devConfig.dbConfig.port,
  dialect: "mysql",
  logging: console.log,
  timezone: '+08:00'
});

// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL 已连接");
  })
  .catch((e) => {
    console.error("无法连接到 MySQL", e);
  });


export default sequelize
