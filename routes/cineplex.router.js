const { Router } = require("express");
const {
  getListCineplex,
  getDetailCineplex,
  createCineplex,
  removeCineplex,
  updateCineplex,
  uploadLogoCineplex,
} = require("../controllers/cineplex.controller");
const cineplexRouter = Router();
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
const { Cineplex } = require("../models");

cineplexRouter.get("/", getListCineplex);
cineplexRouter.get("/:id", getDetailCineplex);

cineplexRouter.post(
  "/",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  createCineplex
);
cineplexRouter.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(Cineplex),
  removeCineplex
);
cineplexRouter.put(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(Cineplex),
  updateCineplex
);
//uploadImageForMovie
cineplexRouter.post(
  "/upload-logo/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(Cineplex),
  uploadImageSingle("cineplexLogo"),
  uploadLogoCineplex
);
module.exports = {
  cineplexRouter,
};
