import sequelize from "../db";
import { DataTypes } from "sequelize";

const QuestionModel = sequelize.define("question_table", {
  problem_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: "提问id",
    unique: "question_table_problem_id_uindex"
  },
  problem_title: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: "问题标题"
  },
  problem_title_image_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "问题标题图片"
  },
  problem_content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "问题内容"
  },
  problem_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "问题状态"
  },
  problem_answer_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "（如果是回复）问题的id"
  },
  problem_tags: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: "问题标签"
  },
  creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "提问者id"
  },
  create_time: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: "提问时间"
  },
  updater: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "更新者id"
  },
  update_time: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: "更新时间"
  },
  problem_reputation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "提问的声望"
  }
}, {
  tableName: "question_table",
  timestamps: false,
  indexes: [
    {
      name: "question_table_problem_id_uindex",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "problem_id" }
      ]
    }
  ]
});

export default QuestionModel;
