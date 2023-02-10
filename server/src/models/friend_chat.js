const {
  DataTypes
} = require('sequelize');

const moment=require('moment');

module.exports = sequelize => {
  const attributes = {
    uid_from: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "uid_from"
    },
    uid_to: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "uid_to"
    },
    message: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "message"
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "time",
      get(){
        return moment(this.getDataValue('time')).format('YYYY-MM-DD HH:mm')
      }
    }
  };
  const options = {
    tableName: "friend_chat",
    comment: "",
    indexes: [{
      name: "friend_chat_user_uid_uid_fk",
      unique: false,
      type: "BTREE",
      fields: ["uid_from", "uid_to"]
    }]
  };
  const FriendChatModel = sequelize.define("friend_chat_model", attributes, options);
  FriendChatModel.removeAttribute('id');//重要，联系集没有主键，直接去掉
  return FriendChatModel;
};