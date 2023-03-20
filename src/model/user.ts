import {DataTypes} from 'sequelize'
import sequelize from "../db";


/**
 * 用户模型
 * @author 周欣愉
 */
const UserModel = sequelize.define('user', {
    id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
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
        allowNull: false,
        defaultValue: 3
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
        allowNull: false,
        defaultValue: 1
    },
    head_img: {
        type: DataTypes.STRING(255),
        allowNull: true
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
        allowNull: false
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
        defaultValue: 0,
        comment: "是否被删除"
    }
}, {
    tableName: 'user',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                {name: "id"},
            ]
        },
        {
            name: "user_id_uindex",
            unique: true,
            using: "BTREE",
            fields: [
                {name: "id"},
            ]
        },
        {
            name: "user_mobile_uindex",
            unique: true,
            using: "BTREE",
            fields: [
                {name: "mobile"},
            ]
        },
        {
            name: "user_e_mail_uindex",
            unique: true,
            using: "BTREE",
            fields: [
                {name: "e_mail"},
            ]
        },
    ]
});

export default UserModel
