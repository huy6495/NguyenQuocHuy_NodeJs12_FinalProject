const jwt = require("jsonwebtoken");
// Check Log-in
const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const secretKey = "NguyenQuocHuy";
    const decode = jwt.verify(token, secretKey);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send("Bạn Chưa Đăng Nhập");
  }
};

const authorize = (arrRole) => (req, res, next) => {
  const { user } = req;
  if (arrRole.findIndex((role) => user.role === role) > -1) {
    next();
  } else {
    res.status(403).send("Bạn Không Có Quyền");
  }
};

module.exports = {
  authenticate,
  authorize,
};
