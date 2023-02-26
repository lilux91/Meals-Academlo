const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Restaurant = db.define('restaurant', {
  id: {
    //llaves primarias
    primaryKey: true,
    autoIncrement: true,
    allowNull: false, //permitir nulos o no
    type: DataTypes.INTEGER, //tipo de dato numero
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active', //valor por defecto Client
    enum: ['active', 'inactive'],
  },
});

module.exports = Restaurant;
