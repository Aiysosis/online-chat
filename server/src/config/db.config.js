module.exports = {
  HOST: "192.168.80.129",
  USER: "senpai",
  PASSWORD: "114514",
  DB: "test",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
