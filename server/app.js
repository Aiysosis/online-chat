var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser"); //body参数解析
var cors = require("cors"); //处理跨域访问,先不采用，cors政策调整为*

var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");
var friendsRouter = require("./src/routes/friends");
var groupsRouter = require("./src/routes/groups");
var chatRouter = require("./src/routes/chat");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); //设置静态文件位置

app.use(cors()); //设置cors

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/groups", groupsRouter);
app.use("/chat", chatRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
