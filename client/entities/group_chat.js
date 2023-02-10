const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    group_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "group_id"
    },
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
      allowNull: true,
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
      field: "time"
    }
  };
  const options = {
    tableName: "group_chat",
    comment: "",
    indexes: [{
      name: "group_chat_groups_group_id_fk",
      unique: false,
      type: "BTREE",
      fields: ["group_id"]
    }, {
      name: "group_chat_user_uid_uid_fk",
      unique: false,
      type: "BTREE",
      fields: ["uid_from", "uid_to"]
    }]
  };
  const GroupChatModel = sequelize.define("group_chat_model", attributes, options);
  GroupChatModel.removeAttribute('id');//重要，联系集没有主键，直接去掉
  return GroupChatModel;
};