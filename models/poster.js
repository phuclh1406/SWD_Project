'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Poster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Poster.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    avatar: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER(10),
    status: {
      type: DataTypes.ENUM,
      values: ['active','deleted']
    }
  }, {
    sequelize,
    modelName: 'Poster',
  });
  return Poster;
};