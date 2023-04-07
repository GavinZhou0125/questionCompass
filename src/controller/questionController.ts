import MyError from "../exception";
import { REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";
import {
  addQuestion,
  answerQuestion,
  deleteQuestion,
  queryAnswerList, queryAnswerListByUser,
  queryQuestion, queryQuestionByHeatList,
  queryQuestionList,
  queryQuestionListByContent,
  queryQuestionListByTag,
  queryQuestionListByTitle,
  queryQuestionListByUser,
  questionReputationChange,
  updateQuestion
} from "../service/questionService";
import redisClient from "../cache";

/**
 * 添加问题
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function addQuestionApi(event, req, res) {
  const { title, imageId, content, tags, auth } = event;
  if (!title || !content || !tags || !auth) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return addQuestion(title, imageId, content, tags, auth);
}


/**
 * 回答问题
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function answerQuestionApi(event, req, res) {
  const { questionId, content, auth } = event;
  if (!questionId || !content || !auth) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }

  return answerQuestion(questionId, content, auth);
}

/**
 * 查询问题by id
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function queryQuestionApi(event, req, res) {
  const { questionId } = event;
  if (!questionId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestion(questionId);
}

/**
 * 查询回答列表
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function answerListApi(event, req, res) {
  const { offset, limit, questionId } = event;
  if (!offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryAnswerList(questionId, offset, limit);

}

/**
 * 查询问题列表
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function queryQuestionListApi(event, req, res) {
  const { offset, limit } = event;
  if (!offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestionList(offset, limit);
}

/**
 * 查询问题列表按热度
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function queryQuestionListHeatApi(event, req, res) {
  const { offset, limit } = event;
  if (!offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestionByHeatList(offset, limit);
}

/**
 * 按tag查问题列表
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function queryQuestionListByTagApi(event, req, res) {
  const { tag, offset, limit } = event;
  if (!tag || !offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestionListByTag(tag, offset, limit);
}

/**
 * 按用户查问题列表
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function queryQuestionListByUserApi(event, req, res) {
  const { auth, offset, limit } = event;
  if (!auth || !offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestionListByUser(auth, offset, limit);
}
/**
 * 按用户查问题列表
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function queryAnswerListByUserApi(event, req, res) {
  const { auth, offset, limit } = event;
  if (!auth || !offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryAnswerListByUser(auth, offset, limit);
}

/**
 * 按标题查问题列表
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function queryQuestionListByTitleApi(event, req, res) {
  const { title, offset, limit } = event;
  if (!title || !offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestionListByTitle(title, offset, limit);
}

/**
 * 按内容查问题列表
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function queryQuestionListByContentApi(event, req, res) {
  const { content, offset, limit } = event;
  if (!content || !offset || !limit) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return queryQuestionListByContent(content, offset, limit);
}

/**
 * 更新问题
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function updateQuestionApi(event, req, res) {
  const { questionId, title, content, tags } = event;
  if (!questionId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return updateQuestion(questionId, title, content, tags);
}

/**
 * 删除问题
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function deleteQuestionApi(event, req, res) {
  const { questionId } = event;
  if (!questionId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return deleteQuestion(questionId);
}

/**
 * 问题的声望值变化
 * @param event 参数
 * @param req 请求
 * @param res 响应
 */
export async function questionReputationChangeApi(event, req, res) {
  const { questionId, reputation } = event;
  if (!questionId || !reputation) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return questionReputationChange(questionId, reputation);
}
