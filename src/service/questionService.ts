import MyError from "../exception";
import { NOT_FOUND_ERROR_CODE, REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";
import QuestionModel from "../model/questionTable";

export async function addQuestion(title, content, tags, userId) {

  if (!title || !content || !tags || !userId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  const question = await QuestionModel.create({
    problem_title: title,
    problem_content: content,
    problem_tags: tags,
    creator: userId
  });
  if (question){
    return question.get("problem_id");
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "添加问题失败");
}
