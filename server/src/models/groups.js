const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    group_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "group_id",
      unique: "groups_group_id_uindex"
    },
    group_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "group_name"
    },
    creator_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "creator_id"
    }
  };
  const options = {
    tableName: "groups",
    comment: "",
    indexes: [{
      name: "groups_user_uid_fk",
      unique: false,
      type: "BTREE",
      fields: ["creator_id"]
    }]
  };
  const GroupsModel = sequelize.define("groups_model", attributes, options);
  GroupsModel.removeAttribute('id');//重要，联系集没有主键，直接去掉
  return GroupsModel;
};