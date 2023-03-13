'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deliverable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Deliverable.belongsTo(models.Application, {foreignKey: 'application_id', targetKey: 'application_id', as: 'deliverable_application'});
    }
  }
  Deliverable.init({
    deliverable_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    file: DataTypes.STRING,
    description: DataTypes.STRING,
    application_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Active", "Deactive", "Finished"],
      validate: {
        isIn: {
          args: [["Active", "Deactive", "Finished"]],
          msg: 'Invalid value for deliverable.status (Active, Deactive, Finished)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Deliverable',
  });
  return Deliverable;
};