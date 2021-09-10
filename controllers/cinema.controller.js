const { Cinema, Cineplex, sequelize } = require("../models");

const getListCinemaByCineplex = async (req, res) => {
  const { nameCineplex } = req.query;
  try {
    const [results] = await sequelize.query(`
      select cinemas.name as cinemaName , cineplexes.name as cineplexeName from cinemas
      inner join cineplexes
      on cinemas.cineplexId = cineplexes.id
      where cineplexes.name like "%${nameCineplex}%";
    `);
    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getListCinemaWithCineplex = async (req, res) => {
  try {
    const cinemaList = await Cinema.findAll({
      include: [
        {
          model: Cineplex,
        },
      ],
    });

    // ();
    res.status(200).send(cinemaList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailCinema = async (req, res) => {
  const { id } = req.params;
  try {
    const cinemaDetail = await Cinema.findByPk(id);
    res.status(200).send(cinemaDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createCinema = async (req, res) => {
  const { name, address, image, cineplexId } = req.body;

  try {
    const newCinema = await Cinema.create({
      name,
      address,
      image,
      cineplexId,
    });
    res.status(201).send(newCinema);
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeCinema = async (req, res) => {
  const { id } = req.params;
  try {
    await Cinema.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("xóa thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCinema = async (req, res) => {
  const { id } = req.params;
  const { name, address, image, cineplexId } = req.body;
  try {
    await Cinema.update(
      { name, address, image, cineplexId },
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

const uploadImageCinema = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  const urlImage = "http://localhost:3000/" + file.path;
  try {
    const cinemaDetail = await Cinema.findByPk(id);
    cinemaDetail.image = urlImage;
    await cinemaDetail.save();
    res.send(cinemaDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  uploadImageCinema,
  getListCinemaWithCineplex,
  getListCinemaByCineplex,
  getDetailCinema,
  createCinema,
  removeCinema,
  updateCinema,
};
