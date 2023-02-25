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
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'deactive'],
      validate: {
        isIn: {
          args: [['active', 'deactive']],
          msg: 'Invalid value for project.status (active, deactive)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};