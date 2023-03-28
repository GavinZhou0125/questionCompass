import sequelize from "../db";
import { DataTypes } from "sequelize";

const FileModel =  sequelize.define("file_table", {
  file_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    autoIncrement: true,
    primaryKey: true,
    comment: "文件id"
  },
  file_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: "文件名"
  },
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: "文件路径"
  },
  create_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "上传者"
  },
  create_time: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: "上传时间"
  }

  }, {
  tableName: "file_table",
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "file_id" }
      ]
    },
    {
      name: "file_table_file_id_uindex",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "file_id" }
      ]
    },
    {
      name: "file_id",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "file_id" }
      ]
    }
  ]
});

export default FileModel
