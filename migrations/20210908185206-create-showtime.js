"use strict";

const { STRING } = require("sequelize");

// const { DataTypes } = require("sequelize/types");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Showtimes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      showDate: {
        type: Sequelize.DATEONLY,
      },
      showTimeArray: {
        type: Sequelize.JSON,
      },
      cinemaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Showtimes");
  },
};
