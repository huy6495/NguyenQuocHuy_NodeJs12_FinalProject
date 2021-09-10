const { Router } = require("express");
const {
  getListShowtimeByMovieId,
  getListShowtimeWithMovieByCinemaId,
  getListShowtimeWithCinema,
  getDetailShowtime,
  createShowtime,
  removeShowtime,
  updateShowtime,
} = require("../controllers/showtime.controller");
const showtimeRouter = Router();
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const {
  checkExist,
} = require("../middlewares/validations/check-exist.middlewares");
const { Showtime } = require("../models");

showtimeRouter.get("/by-movie", getListShowtimeByMovieId);
showtimeRouter.get("/by-cinema", getListShowtimeWithMovieByCinemaId);
showtimeRouter.get("/", getListShowtimeWithCinema);
showtimeRouter.get("/:id", getDetailShowtime);
showtimeRouter.post(
  "/",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  createShowtime
);
showtimeRouter.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(Showtime),
  removeShowtime
);
showtimeRouter.put(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(Showtime),
  updateShowtime
);
module.exports = {
  showtimeRouter,
};
