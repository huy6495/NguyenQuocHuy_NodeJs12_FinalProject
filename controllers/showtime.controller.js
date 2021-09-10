const { Cinema, Showtime, sequelize } = require("../models");

const getListShowtimeByMovieId = async (req, res) => {
  const { movieId } = req.query;
  try {
    const [results] = await sequelize.query(`
      select showDate, showTimeArray from showtimes
      inner join movies
      on showtimes.movieId = movies.id
      where movies.id like "%${movieId}%";
    `);
    //  select cinemas.name as cinemaName , cineplexes.name as cineplexeName from cinemas
    //   inner join cineplexes
    //   on cinemas.cineplexId = cineplexes.id
    //   where cineplexes.name like "%${nameCineplex}%";
    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getListShowtimeWithMovieByCinemaId = async (req, res) => {
  const { cinemaId } = req.query;
  try {
    const [results] = await sequelize.query(`
    select showDate, showTimeArray, nameMovie, Movies.image from showtimes
    inner join cinemas
            on showtimes.cinemaId = cinemas.id
    inner join movies
            on showtimes.movieId = movies.id
             where cinemas.id like "%${cinemaId}%";
      `);

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getListShowtimeWithCinema = async (req, res) => {
  try {
    const showtimeList = await Showtime.findAll({
      include: [
        {
          model: Cinema,
        },
      ],
    });

    // ();
    res.status(200).send(showtimeList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailShowtime = async (req, res) => {
  const { id } = req.params;
  try {
    const ShowtimeDetail = await Showtime.findByPk(id);
    res.status(200).send(ShowtimeDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createShowtime = async (req, res) => {
  const { showDate, showTimeArray, cinemaId, movieId } = req.body;

  try {
    const newShowtime = await Showtime.create({
      showDate,
      showTimeArray,
      cinemaId,
      movieId,
    });
    res.status(201).send(newShowtime);
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeShowtime = async (req, res) => {
  const { id } = req.params;
  try {
    await Showtime.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("xóa thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateShowtime = async (req, res) => {
  const { id } = req.params;
  const { showDate, showTimeArray, cinemaId, movieId } = req.body;
  try {
    await Showtime.update(
      { showDate, showTimeArray, cinemaId, movieId },
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
module.exports = {
  getListShowtimeByMovieId,
  getListShowtimeWithMovieByCinemaId,
  getListShowtimeWithCinema,
  getDetailShowtime,
  createShowtime,
  removeShowtime,
  updateShowtime,
};
