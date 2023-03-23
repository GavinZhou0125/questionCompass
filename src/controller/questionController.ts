import MyError from "../exception";
import { REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";
import { addQuestion } from "../service/questionService";

export function addQuestionApi(event, req, res) {
  const { title, content, tags, userid } = event;
  if (!title || !content || !tags || !userid) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return addQuestion(title, content, tags, userid);
}
