"use strict";

var createError = require("http-errors");

var express = require("express");

var path = require("path");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var mongoose = require("mongoose");

var indexRouter = require("./routes/index");

var usersRouter = require("./routes/users");

var dishRouter = require("./routes/dishRouter");

var promotionsRouter = require("./routes/promotionRouter");

var leaderRouter = require("./routes/leaderRouter");

var Dishes = require("./models/dishes");

var app = express();
var url = "mongodb://127.0.0.1:27017/confusion";
var connect = mongoose.connect(url);
connect.then(function (db) {
  console.log("Connected to the server");
}, function (err) {
  console.log(err);
}); // view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

function auth(req, res, next) {
  console.log(req.headers);
  var authorisationHeader = req.headers.authorization;

  if (!authorisationHeader) {
    var err = new Error("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
  }

  var auth = new Buffer.from(authorisationHeader.split(" ")[1], "base64").toString().split(":");
  var username = auth[0];
  var password = auth[1];
  console.log(auth);

  if (username == "admin" && password == "password") {
    next();
  } else {
    var _err = new Error("You are not authenticated!");

    res.setHeader("WWW-Authenticate", "Basic");
    _err.status = 401;
    return next(_err);
  }
}

app.use(auth);
app.use(express["static"](path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/leaders", leaderRouter);
app.use("/promotions", promotionsRouter);
app.use("/dishes", dishRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;