import MyError from "../exception";
import { NOT_FOUND_ERROR_CODE, REQUEST_PARAMS_ERROR_CODE } from "../exception/errorCode";
import QuestionModel from "../model/questionTable";
import { Op } from "sequelize";
import FileModel from "../model/fileTable";
import UserModel from "../model/user";
import sequelize from "../db";

/**
 * 添加问题
 * @param title 问题标题
 * @param imageId 问题标题图片id
 * @param content 问题内容
 * @param tags 问题标签
 * @param userId 用户id
 */
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

export async function answerQuestion(questionId, answerContent, userId) {
  if (!questionId || !answerContent || !(userId + 1)) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  // 查询对应questionId的问题，修改其状态为1
  const question = await QuestionModel.findOne({
    where: {
      problem_id: Number.parseInt(questionId)
    }
  });
  if (!question) {
    throw new MyError(NOT_FOUND_ERROR_CODE, "问题不存在");
  }
  question.set("problem_status", 1);
  question.save();


  const answer = await QuestionModel.create({
    problem_answer_id: Number.parseInt(questionId),
    problem_content: answerContent,
    creator: userId
  });

  if (answer) {
    return "OK";
  }

}

/**
 * 查询问题by id
 * @param questionId 问题id
 */
export async function queryQuestion(questionId) {
  if (!questionId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  const question = await QuestionModel.findOne({
    where: {
      problem_id: Number.parseInt(questionId)
    },
    attributes: {
      include: [
        [sequelize.literal(`(SELECT COUNT(1) FROM question_table WHERE problem_answer_id = ${questionId} )`), "answer_count"]
      ]
    }
  });
  if (question) {
    await questionReputationChange(questionId, 1);
    return question;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题不存在");
}

/**
 * 查询回答列表
 * @param questionId
 * @param offset
 * @param limit
 */
export async function queryAnswerList(questionId, offset, limit) {
  QuestionModel.hasOne(UserModel, { foreignKey: "id", sourceKey: "creator" });
  const questionList = await QuestionModel.findAll({
    // include: [{ model:UserModel,required:false }],
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit),
    where: {
      problem_answer_id: questionId
    },
    attributes: {
      include: [
        [sequelize.literal(`(SELECT file_path FROM file_table WHERE file_table.file_id = (SELECT id FROM user WHERE id = question_table.creator ) )`), "avatar"]
      ]
    },
    order: [
      ["create_time", "DESC"]
    ]
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "回答列表为空");
}

/**
 * 查询问题列表
 * @param offset 分页开始
 * @param limit 分页结束
 */
export async function queryQuestionList(offset, limit) {
  QuestionModel.belongsTo(FileModel, { foreignKey: "problem_title_image_id", targetKey: "file_id" });
  const questionList = await QuestionModel.findAll({
    include: [FileModel],
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit),
    where: {
      problem_answer_id: null
    },
    order: [
      ["create_time", "DESC"],
      ["problem_reputation", "DESC"]
    ]
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题列表为空");
}

/**
 * 根据标签查询问题列表
 * @param tag 标签
 * @param offset 分页开始
 * @param limit 分页结束
 */
export async function queryQuestionListByTag(tag, offset, limit) {
  const questionList = await QuestionModel.findAll({
    where: {
      problem_tags: {
        [Op.like]: `%${tag}%`
      }
    },
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit),
    order: [
      ["create_time", "DESC"],
      ["problem_reputation", "DESC"]
    ]
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题列表为空");
}

/**
 * 根据用户id查询问题列表
 * @param userId 用户id
 * @param offset 分页开始
 * @param limit 分页结束
 */
export async function queryQuestionListByUser(userId, offset, limit) {
  const questionList = await QuestionModel.findAll({
    where: {
      creator: Number.parseInt(userId),
      //是问题
      problem_answer_id: {
        [Op.is]: null,
      }

    },
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit),
    order: [
      ["create_time", "DESC"],
      ["problem_reputation", "DESC"]
    ]
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题列表为空");
}

/**
 * 根据用户id查询问题列表
 * @param userId 用户id
 * @param offset 分页开始
 * @param limit 分页结束
 */
export async function queryAnswerListByUser(userId, offset, limit) {
  const questionList = await QuestionModel.findAll({
    where: {
      creator: Number.parseInt(userId),
      //是回答
      problem_answer_id: {
        [Op.not]: null,
      }
    },
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit),
    order: [
      ["create_time", "DESC"],
      ["problem_reputation", "DESC"]
    ]
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题列表为空");
}

/**
 * 根据标题查询问题列表
 * @param title 标题
 * @param offset 分页开始
 * @param limit 分页结束
 */
export async function queryQuestionListByTitle(title, offset, limit) {
  const questionList = await QuestionModel.findAll({
    where: {
      problem_title: {
        [Op.like]: `%${title}%`
      }
    },
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit),
    order: [
      ["create_time", "DESC"],
      ["problem_reputation", "DESC"]
    ]
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题列表为空");
}

/**
 * 根据内容查询问题列表
 * @param content 内容
 * @param offset 分页开始
 * @param limit 分页结束
 */
export async function queryQuestionListByContent(content, offset, limit) {
  const questionList = await QuestionModel.findAll({
    where: {
      problem_content: {
        [Op.like]: `%${content}%`
      }
    },
    offset: Number.parseInt(offset),
    limit: Number.parseInt(limit),
    order: [
      ["create_time", "DESC"],
      ["problem_reputation", "DESC"]
    ]
  });
  if (questionList) {
    return questionList;
  }
  return new MyError(NOT_FOUND_ERROR_CODE, "问题列表为空");
}

/**
 * 更新问题
 * @param questionId 问题id
 * @param title 标题
 * @param content 内容
 * @param tags 标签
 */
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


/**
 * 删除问题
 * @param questionId 问题id
 */
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

export async function questionReputationChange(questionId, reputation) {
  if (!questionId) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  const question = await QuestionModel.findOne({
    where: {
      problem_id: Number.parseInt(questionId)
    }
  });
  if (question) {
      question.set("problem_reputation", question.get("problem_reputation") + reputation);
      question.save();
    return question;
  }
}
