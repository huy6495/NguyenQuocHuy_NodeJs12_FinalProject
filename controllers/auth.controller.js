const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    //1. find user
    const userLogin = await User.findOne({ where: { email } });
    if (userLogin) {
      //2. compare password
      const isAuth = bcryptjs.compareSync(password, userLogin.password);
      if (isAuth) {
        // create token
        const payload = {
          id: userLogin.id,
          email: userLogin.email,
          role: userLogin.role,
        };
        const secretKey = "NguyenQuocHuy";
        const token = jwt.sign(payload, secretKey, {
          expiresIn: 12 * 30 * 24 * 60 * 60,
        });
        res.status(200).send({ massage: "Đăng Nhập Thành Công", token });
      } else {
        res.status(400).send("Sai Mật Khẩu");
      }
    } else {
      res.status(404).send("email không tồn tại");
    }
    res.send({ email, password });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  signIn,
  //   getListUser,
};
