import sequelize from "../db";
import { DataTypes } from "sequelize";

const preferModel = sequelize.define("prefer_table",{
  prefer_id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
    unique:true,
    autoIncrement:true
  },
  prefer_name:{
    type:DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment:"偏好名称（学校问题，学生问题）"
  },
  prefer_tag_dis:{
    type:DataTypes.STRING(30),
    allowNull:true,
    comment: "偏好tag名称的聚合列（001，002）"
  },
  prefer_tag_dis_md5:{
    type:DataTypes.STRING(255),
    allowNull:true
  }
},{
  tableName:"prefer_table"
})

export default preferModel;
