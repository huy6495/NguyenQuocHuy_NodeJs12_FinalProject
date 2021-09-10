const express = require("express");
const rootRouter = express.Router();
const { movieRouter } = require("./movie.router");
const { userRouter } = require("./user.router");
const { cinemaRouter } = require("./cinema.router");
const { cineplexRouter } = require("./cineplex.router");
const { showtimeRouter } = require("./showtime.router");
const { authRouter } = require("./auth.router");

// http://localhost:3000/api/
rootRouter.use("/movie", movieRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/cinema", cinemaRouter);
rootRouter.use("/cineplex", cineplexRouter);
rootRouter.use("/showtime", showtimeRouter);
rootRouter.use("/auth", authRouter);

module.exports = {
  rootRouter,
};
