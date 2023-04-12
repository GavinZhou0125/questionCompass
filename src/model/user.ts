import {DataTypes} from 'sequelize'
import sequelize from "../db";


/**
 * 用户模型
 * @author 周欣愉
 */
const UserModel = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        defaultValue: undefined,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    sex: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    birth: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    head_img: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    e_mail: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: "user_e_mail_uindex"
    },
    mobile: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "user_mobile_uindex"
    },
    creator: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    create_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    update_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    is_deleted: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "是否被删除"
    }
}, {
    tableName: 'user',
    timestamps: true,
    deletedAt: 'is_deleted',
    createdAt: 'create_time',
    updatedAt: 'update_time',
    paranoid: true,
    indexes: [
        {
            name: "user_id_uindex",
            unique: true,
            using: "BTREE",
            fields: [
                {name: "id"},
            ]
        }, {
            name: "user_head_img_index",
            unique: false,
            using: "BTREE",
            fields: [
                { name: "head_img" }
            ]
        }, {
            name: "user_mobile_uindex",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "user_mobile" }
            ]
        }
    ]
});

export default UserModel
