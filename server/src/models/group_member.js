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
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "uid"
    }
  };
  const options = {
    tableName: "group_member",
    comment: "",
    indexes: [{
      name: "group_user_user_uid_fk",
      unique: false,
      type: "BTREE",
      fields: ["uid"]
    }]
  };
  const GroupMemberModel = sequelize.define("group_member_model", attributes, options);
  GroupMemberModel.removeAttribute('id');//重要，联系集没有主键，直接去掉
  return GroupMemberModel;
};