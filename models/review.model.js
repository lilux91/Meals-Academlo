const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Review = db.define('review', {
  id: {
    //llaves primarias
    primaryKey: true,
    autoIncrement: true,
    allowNull: false, //permitir nulos o no
    type: DataTypes.INTEGER, //tipo de dato numero
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  comment: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = Review;
