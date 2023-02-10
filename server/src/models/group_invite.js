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
    },
    uid_to: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "uid_to"
    }
  };
  const options = {
    tableName: "group_invite",
    comment: "",
    indexes: [{
      name: "group_invite_groups_group_id_fk",
      unique: false,
      type: "BTREE",
      fields: ["group_id"]
    }, {
      name: "group_invite_user_uid_uid_fk",
      unique: false,
      type: "BTREE",
      fields: ["uid_from", "uid_to"]
    }]
  };
  const GroupInviteModel = sequelize.define("group_invite_model", attributes, options);
  return GroupInviteModel;
};