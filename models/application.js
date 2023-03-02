'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.Student, {foreignKey: 'student_id', targetKey: 'student_id', as: 'application_student'})
      Application.belongsTo(models.JobPost, {foreignKey: 'post_id', targetKey: 'post_id', as: 'application_post'});
      Application.hasMany(models.Deliverable, {as: 'application_deliverable', foreignKey: 'application_id'});
    }
  }
  Application.init({
    application_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    price: DataTypes.DOUBLE,
    student_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    post_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Active", "Pending", "Deactive", "Finished"],
      validate: {
        isIn: {
          args: ["Active", "Pending", "Deactive", "Finished"],
          msg: 'Invalid value for application.status (Active, Pending, Deactive, Finished)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};