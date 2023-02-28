'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Student, {foreignKey: 'student_id', targetKey: 'student_id', as: 'project_student'})
      Project.hasMany(models.JobPost, {as: 'project_post', foreignKey: 'post_id'});
      Project.belongsToMany(models.Student, {through: models.History });
      Project.hasMany(models.History, {as: "project_history", foreignKey: 'project_id'});
    }
  }
  Project.init({
    project_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    project_name: DataTypes.STRING,
    student_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['Active', 'Deactive', 'Finished'],
      validate: {
        isIn: {
          args: [['Active', 'Deactive', 'Finished']],
          msg: 'Invalid value for project.status (Active, Deactive, Finished)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};