const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const mongoose = require("mongoose");
// const { Client } = require("pg");
// const Sequelize = require("sequelize");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dishRouter = require("./routes/dishRouter");
const promotionsRouter = require("./routes/promotionRouter");
const leaderRouter = require("./routes/leaderRouter");
const Dishes = require("./models/dishes");
const app = express();
const url = "mongodb://127.0.0.1:27017/confusion";
const passport = require("passport");
const authenticate = require("./authenticate");
const config = require("./config");
const connect = mongoose.connect(config.mongoUrl);
// const sequelize = new Sequelize(
//     "postgres://postgres:admin@localhost:5432/HRMS"
// );
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log("Connection has been established successfully.");
//     })
//     .catch((err) => {
//         console.error("Unable to connect to the database:", err);
//     });
connect.then(
    (db) => {
        console.log("Connected to the server");
    },
    (err) => {
        console.log(err);
    }
);
// const User = sequelize.define(
//     "user",
//     {
//         firstName: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         lastName: {
//             type: Sequelize.STRING,
//         },
//     },
//     {}
// );
// User.sync({ force: false });
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
// app.use(cookieParser("12345-67890-12345-67890"));
// app.use(
//     session({
//         name: "session-id",
//         secret: "12345-67890-12345-67890",
//         saveUninitialized: false,
//         resave: false,
//         store: new FileStore()
//     })
// );
app.use(passport.initialize());
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use("/leaders", leaderRouter);
app.use("/promotions", promotionsRouter);
app.use("/dishes", dishRouter);
// app.post("/user", async (req, res) => {
//     try {
//         const newUser = new User(req.body);
//         await newUser.save();
//         res.json({ user: newUser });
//     } catch (error) {
//         console.error(error);
//     }
// });
// app.get("/user/:userId", async (req, res) => {
//     const userId = req.params.userId;

//     try {
//         const user = await User.findAll({
//             where: {
//                 id: userId,
//             },
//         });

//         res.json({ user });
//     } catch (error) {
//         console.error(error);
//     }
// });
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