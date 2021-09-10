"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Movie, Cinema }) {
      // define association here
      this.belongsTo(Movie, {
        foreignKey: "movieId",
      });
      this.belongsTo(Cinema, {
        foreignKey: "cinemaId",
      });
    }
  }
  Showtime.init(
    {
      showDate: DataTypes.DATEONLY,
      showTimeArray: DataTypes.JSON,
      cinemaId: { type: DataTypes.INTEGER, allowNull: false },
      movieId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Showtime",
    }
  );
  return Showtime;
};
