
import redis from "redis";
// 创建Redis连接配置
import {devConfig} from "src/config/config";

const redisClient = redis.createClient(devConfig.redisConfig);
redisClient.on("connect", function() {
    console.log("Redis 已连接");
});
redisClient.on("error", function(e) {
    console.error("Redis 连接错误"+e);
});

export default redisClient
