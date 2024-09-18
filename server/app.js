const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorController = require("./controller/errorController");
const userRouter = require("./router/userRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/public", express.static("public"));

app.use("/api/user", userRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `The route ${req.originalUrl} is not defined in this server`,
  });
});
//if error
app.use(errorController);

module.exports = app;
