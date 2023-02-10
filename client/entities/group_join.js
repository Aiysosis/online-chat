const {
  DataTypes
} = require('sequelize');

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
    group_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "group_id"
    }
  };
  const options = {
    tableName: "group_join",
    comment: "",
    indexes: [{
      name: "group_join_user_uid_fk",
      unique: false,
      type: "BTREE",
      fields: ["uid_from"]
    }, {
      name: "group_join_groups_group_id_fk",
      unique: false,
      type: "BTREE",
      fields: ["group_id"]
    }]
  };
  const GroupJoinModel = sequelize.define("group_join_model", attributes, options);
  return GroupJoinModel;
};