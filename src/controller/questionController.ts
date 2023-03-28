import MyError from "../exception";
import { REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";
import {
  addQuestion, deleteQuestion,
  queryQuestion,
  queryQuestionList, queryQuestionListByContent,
  queryQuestionListByTag, queryQuestionListByTitle,
  queryQuestionListByUser, updateQuestion
} from "../service/questionService";
import redisClient from "../cache";

export async function addQuestionApi(event, req, res) {
  console.log(111);
  const { title, imageId, content, tags, token } = event;
  if (!title || !content || !tags || !token) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  let creator = 0
  redisClient.get(token, (err, reply) => {
    if (err) {
      throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误,token查询失败");
    }
    if (reply) {
      creator = reply
    }
  })
  await addQuestion(title, imageId, content, tags, creator);
  return;
}

export async function queryQuestionApi(event, req, res) {
  const { questionId } = event;
  if (!questionId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestion(questionId);
}

export async function queryQuestionListApi(event, req, res) {
  const { offset, limit } = event;
  if (!offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestionList(offset, limit);
}

export async function queryQuestionListByTagApi(event, req, res) {
  const { tag, offset, limit } = event;
  if (!tag || !offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestionListByTag(tag, offset, limit);
}

export async function queryQuestionListByUserApi(event, req, res) {
  const { userid, offset, limit } = event;
  if (!userid || !offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestionListByUser(userid, offset, limit);
}

export async function  queryQuestionListByTitleApi(event, req, res) {
  const { title, offset, limit } = event;
  if (!title || !offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestionListByTitle(title, offset, limit);
}

export async function  queryQuestionListByContentApi(event, req, res) {
  const { content, offset, limit } = event;
  if (!content || !offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestionListByContent(content, offset, limit);
}

export async function updateQuestionApi(event, req, res) {
  const { questionId, title, content, tags } = event;
  if (!questionId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return updateQuestion(questionId, title, content, tags);
}

export async function deleteQuestionApi(event, req, res) {
  const { questionId } = event;
  if (!questionId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return deleteQuestion(questionId);
}
