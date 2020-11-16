const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const envConfig = require("dotenv").config;

const indexRouter = require("./routes/index");
const api = require("./routes/api");

envConfig();
const app = express();

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017";

mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
  (err) => {
    if (err) throw err;
    console.log("mongodb is connected");
  }
);

// view engine setup
if (process.env.NODE_ENV === "development") {
  const cors = require("cors");
  app.use(cors());
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/api", api);
require("./controllers/setupController")(app);

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
