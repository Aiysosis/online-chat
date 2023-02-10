const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");//类
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define:{
    timestamps: false
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.UserModel = require("./user.js")(sequelize);
db.BeFriendModel=require('./befriend')(sequelize);
db.FriendsModel=require('./friends')(sequelize);
db.GroupsModel=require('./groups')(sequelize);
db.GroupJoinModel=require('./group_join')(sequelize);
db.GroupMemberModel=require('./group_member')(sequelize);
db.GroupInviteModel=require('./group_invite')(sequelize);
db.FriendChatModel=require('./friend_chat')(sequelize);
db.GroupChatModel=require('./group_chat')(sequelize);

module.exports = db;