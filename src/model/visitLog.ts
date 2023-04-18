import sequelize from "../db";
import { DataTypes } from "sequelize";

const visitLogModel = sequelize.define("visit_log",{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
    unique:true,
    autoIncrement:true
  },
  question_id:{
    type:DataTypes.INTEGER,
    allowNull: true
  },
  user_id:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  question_prefer:{
    type:DataTypes.STRING(10),
    allowNull:true
  },
  visit_time:{
    type:DataTypes.DATE,
    allowNull:false
  }
},{
  tableName:"visit_log"
})

export default visitLogModel;
