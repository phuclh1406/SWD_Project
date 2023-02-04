'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemType.init({
    name: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'deleted']
    }
  }, {
    sequelize,
    modelName: 'ItemType',
  });
  return ItemType;
};