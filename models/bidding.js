'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bidding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bidding.init({
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'deleted']
    }
  }, {
    sequelize,
    modelName: 'Bidding',
  });
  return Bidding;
};