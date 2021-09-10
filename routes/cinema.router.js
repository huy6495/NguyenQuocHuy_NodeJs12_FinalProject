const { Router } = require("express");
const {
  getListCinemaWithCineplex,
  getListCinemaByCineplex,
  getDetailCinema,
  createCinema,
  removeCinema,
  updateCinema,
  uploadImageCinema,
} = require("../controllers/cinema.controller");
const cinemaRouter = Router();
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
const { Cinema } = require("../models");

cinemaRouter.get("/by-cineplex", getListCinemaByCineplex);
cinemaRouter.get("/", getListCinemaWithCineplex);
cinemaRouter.get("/:id", getDetailCinema);
cinemaRouter.post(
  "/",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  createCinema
);
cinemaRouter.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(Cinema),
  removeCinema
);
cinemaRouter.put(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(Cinema),
  updateCinema
);
//uploadImageCinema
cinemaRouter.post(
  "/upload-image/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(Cinema),
  uploadImageSingle("cineplexLogo"),
  uploadImageCinema
);
module.exports = {
  cinemaRouter,
};
