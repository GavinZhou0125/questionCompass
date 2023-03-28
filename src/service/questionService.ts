import MyError from "../exception";
import { NOT_FOUND_ERROR_CODE, REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";
import QuestionModel from "../model/questionTable";
import { Op } from "sequelize";
import FileModel from "../model/fileTable";

export async function addQuestion(title, imageId, content, tags, userId) {
  if (!title || !content || !tags || !(userId + 1)) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  const question = await QuestionModel.create({
    problem_title: title,
    problem_title_image_id: Number.parseInt(imageId),
    problem_content: content,
    problem_tags: tags,
    creator: userId
  });
  if (question) {
    console.log(question);
    return question.get("problem_id");
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "添加问题失败");
}

export async function queryQuestion(questionId) {
  if (!questionId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  const question = await QuestionModel.findOne({
    where: {
      problem_id: Number.parseInt(questionId)
    }
  });
  if (question) {
    return question;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题不存在");
}


export async function queryQuestionList(offset, limit) {
  QuestionModel.belongsTo(FileModel, { foreignKey: "problem_title_image_id", targetKey: "file_id" });
  const questionList = await QuestionModel.findAll({
    include: [FileModel],
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit),
    where: {
      problem_answer_id: null
    },
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题列表为空");
}

export async function queryQuestionListByTag(tag, offset, limit) {
  const questionList = await QuestionModel.findAll({
    where: {
      problem_tags: {
        [Op.like]: `%${tag}%`
      }
    },
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit)
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题列表为空");
}

export async function queryQuestionListByUser(userId, offset, limit) {
  const questionList = await QuestionModel.findAll({
    where: {
      creator: Number.parseInt(userId)
    },
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit)
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题列表为空");
}

export async function queryQuestionListByTitle(title, offset, limit) {
  const questionList = await QuestionModel.findAll({
    where: {
      problem_title: {
        [Op.like]: `%${title}%`
      }
    },
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit)
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题列表为空");
}

export async function queryQuestionListByContent(content, offset, limit) {
  const questionList = await QuestionModel.findAll({
    where: {
      problem_content: {
        [Op.like]: `%${content}%`
      }
    },
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit)
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题列表为空");
}

export async function updateQuestion(questionId, title, content, tags) {
  if (!questionId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  const question = await QuestionModel.findOne({
    where: {
      problem_id: Number.parseInt(questionId)
    }
  });
  if (question) {
    if (title) {
      question.set("problem_title", title);
    }
    if (content) {
      question.set("problem_content", content);
    }
    if (tags) {
      question.set("problem_tags", tags);
    }
    question.save();
    return question;
  }
  throw new MyError(NOT_FOUND_ERROR_CODE, "问题不存在");
}


export async function deleteQuestion(questionId) {
  if (!questionId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  const question = await QuestionModel.destroy({
    where: {
      problem_id: Number.parseInt(questionId)
    }
  });
  if (question) {
    return "问题已删除";
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题不存在");
}
