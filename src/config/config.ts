export const devConfig = {
  redisConfig: {
    host: "localhost",
    port: "6379"
  },
  // MySQL 配置
  dbConfig: {
    database: "QCDB",
    username: "root",
    password: "123456",
    host: "localhost",
    port: 3306
  },
  smsConfig: {
    accessKeyId: "LTAI5tFwodkH4m5j3xn18mhT",
    accessKeySecret: "X3qelBtzjEXh7p7Nwr6E2DNqboaEPV"
  },
  upload: {
    fileName: "file",
    path: "./public/uploads",
    requestPath: "../public/uploads",
    maxSize: 1024 * 1024 * 2,
    allowType: ["image/jpeg", "image/png", "image/gif"]
  }
};
