'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JobPost.belongsTo(models.Project, {foreignKey: 'project_id', targetKey: 'project_id', as: 'post_project'});
      JobPost.belongsTo(models.Category, {foreignKey: 'cate_id', targetKey: 'cate_id', as: 'post_category'});
      JobPost.belongsTo(models.Major, {foreignKey: 'major_id', targetKey: 'major_id', as: 'post_major'});
      JobPost.belongsToMany(models.Student, {through: models.Application});
      JobPost.hasMany(models.Application);
    }
  }
  JobPost.init({
    post_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    post_title: DataTypes.STRING,
    description: DataTypes.STRING,
    time_start: DataTypes.DATEONLY,
    time_end: DataTypes.DATEONLY,
    price: DataTypes.DOUBLE,
    project_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
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
      values: ['active', 'deactive', 'finished'],
      validate: {
        isIn: {
          args: [['active', 'deactive', 'finish']],
          msg: 'Invalid value for jobpost.status (active, deactive, finish)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'JobPost',
  });
  return JobPost;
};