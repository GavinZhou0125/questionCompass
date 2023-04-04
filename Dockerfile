# 使用官方 Node.js 轻量级镜像
# https://hub.docker.com/_/node
FROM node:16-slim

# 定义工作目录
WORKDIR D:/Code/Front/DockerRuntime

# 将本地代码复制到工作目录内
COPY ./ ./

RUN npm install

RUN npm install -g esno

EXPOSE 7345

# 启动服务
CMD [ "npm", "start" ]
