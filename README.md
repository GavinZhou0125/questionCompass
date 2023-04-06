# 问答校园

## 平台介绍

校园墙的信息化一直是一个空缺，学生们在校园里面有很多问题，但是没有一个平台可以让他们提问，也没有一个平台可以让他们回答问题。我们的平台就是为了解决这个问题而诞生的，我们的平台可以让学生们在校园里面提问，也可以让学生们在校园里面回答问题。相比较其他的论坛平台根据用户的喜好推荐帖子，我们的平台根据问题的热度推荐帖子，这样可以平衡用户想要看的帖子和当前热门贴。

- 前端技术栈 Vue.js 3.x + TS + Element Plus + Axios + Vue Router + Pinia
- 后端技术栈 Express + TS + Sequelize + MySQL + Redis

## 内置功能

- [x] 用户模块
- [x] 问题模块
- [x] 文件模块

## 部署

> 前序准备
> - Node.js 16.x (16.13.1)
> - MySQL 8.x (8.0.27)
> - Redis 6.x (7.0.0)
> - Ts-node 8.x (8.10.2)
> - tsx 3.x (3.12.5)

### 前端

```bash
# 拉取项目
git clone https://gitee.com/xiaochuanchuan0125/question-campus.git

# 进入项目目录
cd question-campus

# 安装依赖
npm install --registry=https://registry.npm.taobao.org

# 启动项目
npm run start
```

### 后端

```bash
# 拉取项目
git clone https://github.com/GavinZhou0125/questionCompass.git

# 进入项目目录
cd questionCompass

# 安装依赖
npm install --registry=https://registry.npm.taobao.org

# 启动项目
npm run start
```
