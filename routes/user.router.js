const express = require("express");

const {
  getListUser,
  getDetailUser,
  createUser,
  removeUser,
  updateUser,
  uploadAvatar,
} = require("../controllers/user.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const {
  uploadImageSingle,
} = require("../middlewares/uploads/upload-image.middlewares");
const {
  checkExist,
} = require("../middlewares/validations/check-exist.middlewares");
const { User } = require("../models");

const userRouter = express.Router();

/**
 * api : lấy danh sach nguoi dung
 * method : get
 * url : http://localhost:3000/api/user/
 */
userRouter.get("/", getListUser);

/**
 * api : lấy chi tiết nguoi dung
 * method : get
 * url : http://localhost:3000/api/movie/:id
 */
userRouter.get("/:id", getDetailUser);

/**
 * api : tạo nguoi dung moi
 * method : post
 * url : http://localhost:3000/api/user/
 * body : { movieName, trailer, description, score }
 */
userRouter.post("/", createUser);

/**
 * api : xóa nguoi dung
 * method : delete
 * url : http://localhost:3000/api/movie/:id
 */
userRouter.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPPER_ADMIN"]),
  checkExist(User),
  removeUser
);

/**
 * api : cập nhật nguoi dung
 * method : put
 * url : http://localhost:3000/api/user/:id
 */
userRouter.put("/:id", checkExist(User), updateUser);

// upload avatar
userRouter.post(
  "/upload-avatar",
  authenticate,
  uploadImageSingle("avatarUser"),
  uploadAvatar
);

module.exports = {
  userRouter,
};
