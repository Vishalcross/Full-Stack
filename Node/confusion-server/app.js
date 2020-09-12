const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dishRouter = require("./routes/dishRouter");
const promotionsRouter = require("./routes/promotionRouter");
const leaderRouter = require("./routes/leaderRouter");
const Dishes = require("./models/dishes");
const app = express();
const url = "mongodb://127.0.0.1:27017/confusion";

const connect = mongoose.connect(url);
connect.then(
    (db) => {
        console.log("Connected to the server");
    },
    (err) => {
        console.log(err);
    }
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(cookieParser("12345-67890-12345-67890"));

function auth(req, res, next) {
    console.log(req.signedCookies);
    if (!req.signedCookies.user) {
        console.log("There are no cookies");
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error("You are not authenticated!");
            res.setHeader("WWW-Authenticate", "Basic");
            err.status = 401;
            next(err);
            return;
        }

        var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
            .toString()
            .split(":");
        var user = auth[0];
        var pass = auth[1];
        if (user == "admin" && pass == "password") {
            res.cookie("user", "admin", {
                signed: true,
            });
            next(); // authorized
        } else {
            var err = new Error("You are not authenticated!");
            res.setHeader("WWW-Authenticate", "Basic");
            err.status = 401;
            next(err);
        }
    } else {
        console.log("There are cookies");
        if (req.signedCookies.user === "admin") {
            next();
        } else {
            var err = "You are not authenticated";
            err.status = 401;
            next(err);
        }
    }
}

app.use(auth);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/leaders", leaderRouter);
app.use("/promotions", promotionsRouter);
app.use("/dishes", dishRouter);

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
