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
      Project.belongsTo(models.Student, {foreignKey: 'poster_id', targetKey: 'student_id', as: 'project_poster'})

      Project.belongsTo(models.Student, {
        foreignKey: "doer_id",
        targetKey: 'student_id',
        as: "project_doer",
      });

      // Project.hasMany(models.JobPost, {as: 'project_post', foreignKey: 'post_id'});
      Project.belongsTo(models.Category, {foreignKey: 'cate_id', targetKey: 'cate_id', as: 'project_category'});
      Project.belongsTo(models.Major, {foreignKey: 'major_id', targetKey: 'major_id', as: 'project_major'});

      Project.belongsToMany(models.Student, {
        through: 'Application',
        foreignKey: 'project_id',
        otherKey: 'student_id',
        as: "project_application",
      });
    }
  }
  Project.init({
    project_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    project_name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    url: DataTypes.STRING,
    image: DataTypes.STRING,
    time_end: DataTypes.DATE,
    poster_id: {
      type: DataTypes.UUID,
    },
    doer_id: {
      type: DataTypes.UUID
    },
    cate_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    major_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Active', 'Deactive', 'Received', 'Finished'],
      validate: {
        isIn: {
          args: [['Active', 'Deactive', 'Received', 'Finished']],
          msg: 'Invalid value for project.status (Active, Deactive, Received, Finished)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};