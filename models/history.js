'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Student, {foreignKey: 'student_id', targetKey: 'student_id', as: 'history_student' })
      History.belongsTo(models.Project, {foreignKey: 'project_id', targetKey: 'project_id', as: 'history_project'});
    }
  }
  History.init({
    history_id: {
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
      values: ["Active", "Deactive"],
      validate: {
        isIn: {
          args: ["Active", "Deactive"],
          msg: 'Invalid value for history.status (Active, Deactive)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};