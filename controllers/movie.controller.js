const { Movie } = require("../models");

const getListMovie = async (req, res) => {
  try {
    const movieList = await Movie.findAll();
    res.status(200).send(movieList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movieDetail = await Movie.findByPk(id);
    res.status(200).send(movieDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createMovie = async (req, res) => {
  const { nameMovie, trailer, description, score } = req.body;

  try {
    const newMovie = await Movie.create({
      nameMovie,
      trailer,
      description,
      score,
    });
    res.status(201).send(newMovie);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const removeMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await Movie.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("xóa thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { nameMovie, trailer, description, score } = req.body;
  try {
    await Movie.update(
      { nameMovie, trailer, description, score },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send("update movie thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadImageMovie = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  const urlImage = "http://localhost:3000/" + file.path;
  // lưu link hinh xuống db
  try {
    const movieDetail = await Movie.findByPk(id);
    movieDetail.image = urlImage;
    await movieDetail.save();
    res.send(movieDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  uploadImageMovie,
  updateMovie,
  removeMovie,
  getListMovie,
  createMovie,
  getDetailMovie,
};
