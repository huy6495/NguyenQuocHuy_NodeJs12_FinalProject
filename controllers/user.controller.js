const bcryptjs = require("bcryptjs");
const { User } = require("../models");

const getListUser = async (req, res) => {
  try {
    const userList = await User.findAll();
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userDetail = await User.findByPk(id);
    res.status(200).send(userDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    // tạo chuổi ngẫu nhiêu
    const salt = bcryptjs.genSaltSync(10);
    // mã hóa password
    const hashPassword = bcryptjs.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      phone,
      role,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("xóa thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, role } = req.body;
  try {
    await User.update(
      { name, email, phone, role },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send("update thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadAvatar = async (req, res) => {
  const { file, user } = req;
  const urlImage = "http://localhost:3000/" + file.path;
  try {
    const userDetail = await User.findByPk(user.id);
    userDetail.avatar = urlImage;
    await userDetail.save();
    res.send(userDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  uploadAvatar,
  updateUser,
  removeUser,
  getListUser,
  createUser,
  getDetailUser,
};
