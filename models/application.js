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
      Application.belongsTo(models.Student, {
        foreignKey: 'student_id',
        as: 'application_student'
      });
      
      Application.belongsTo(models.Project, {
        foreignKey: 'project_id',
        as: 'application_project'
      });
      
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
    project_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Active", "Deactive", "Accepted", "Submitted", "Overdue", "Finished"],
      validate: {
        isIn: {
          args: [["Active", "Deactive", "Accepted", "Submitted", "Overdue", "Finished"]],
          msg: 'Invalid value for application.status (Active, Deactive, Accepted, Submitted, Overdue, Finished)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};