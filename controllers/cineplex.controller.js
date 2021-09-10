const { Cineplex, Cinema } = require("../models");

const getListCineplex = async (req, res) => {
  try {
    const cineplexList = await Cineplex.findAll({
      include: [
        {
          model: Cinema,
        },
      ],
    });

    res.status(200).send(cineplexList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailCineplex = async (req, res) => {
  const { id } = req.params;
  try {
    const cineplexDetail = await Cineplex.findByPk(id);
    res.status(200).send(cineplexDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createCineplex = async (req, res) => {
  const { name, logo } = req.body;

  try {
    const newCineplex = await Cineplex.create({
      name,
      logo,
    });
    res.status(201).send(newCineplex);
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeCineplex = async (req, res) => {
  const { id } = req.params;
  try {
    await Cineplex.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("xóa thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCineplex = async (req, res) => {
  const { id } = req.params;
  const { name, logo } = req.body;
  try {
    await Cineplex.update(
      { name, logo },
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

const uploadLogoCineplex = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  const urlImage = "http://localhost:3000/" + file.path;
  try {
    const cineplexDetail = await Cineplex.findByPk(id);
    cineplexDetail.logo = urlImage;
    await cineplexDetail.save();
    res.send(cineplexDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  uploadLogoCineplex,
  getListCineplex,
  getDetailCineplex,
  createCineplex,
  removeCineplex,
  updateCineplex,
};
