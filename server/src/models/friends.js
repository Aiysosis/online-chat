const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    uid_a: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "uid_a"
    },
    uid_b: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "uid_b"
    }
  };
  const options = {
    tableName: "friends",
    comment: "",
    indexes: [{
      name: "friends_user_uid_fk",
      unique: false,
      type: "BTREE",
      fields: ["uid_a"]
    }, {
      name: "friends_user_uid_fk_2",
      unique: false,
      type: "BTREE",
      fields: ["uid_b"]
    }]
  };
  const FriendsModel = sequelize.define("friends_model", attributes, options);
  FriendsModel.removeAttribute('id');//重要，联系集没有主键，直接去掉
  return FriendsModel;
};