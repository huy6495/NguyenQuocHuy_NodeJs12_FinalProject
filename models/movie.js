"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Showtime }) {
      // define association here
      this.hasMany(Showtime, {
        foreignKey: "movieId",
      });
    }
  }
  Movie.init(
    {
      nameMovie: DataTypes.STRING,
      trailer: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
