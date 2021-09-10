const express = require("express");

const {
  getListMovie,
  getDetailMovie,
  createMovie,
  removeMovie,
  updateMovie,
  uploadImageMovie,
} = require("../controllers/movie.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const {
  checkExist,
} = require("../middlewares/validations/check-exist.middlewares");
const {
  uploadImageSingle,
} = require("../middlewares/uploads/upload-image.middlewares");
const { Movie } = require("../models");

const movieRouter = express.Router();

movieRouter.get("/", getListMovie);

movieRouter.get("/:id", getDetailMovie);

movieRouter.post(
  "/",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  createMovie
);

movieRouter.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(Movie),
  removeMovie
);

movieRouter.put(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(Movie),
  updateMovie
);

//uploadImageForMovie
movieRouter.post(
  "/upload-image/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(Movie),
  uploadImageSingle("imageMovie"),
  uploadImageMovie
);

module.exports = {
  movieRouter,
};
