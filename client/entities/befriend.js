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
    tableName: "befriend",
    comment: "",
    indexes: [{
      name: "befriend_user_uid_fk",
      unique: false,
      type: "BTREE",
      fields: ["uid_from"]
    }, {
      name: "befriend_user_uid_fk_2",
      unique: false,
      type: "BTREE",
      fields: ["uid_to"]
    }]
  };
  const BefriendModel = sequelize.define("befriend_model", attributes, options);
  BefriendModel.removeAttribute('id');//重要，联系集没有主键，直接去掉
  return BefriendModel;
};