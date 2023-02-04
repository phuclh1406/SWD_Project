'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    decription: DataTypes.STRING,
    post_title: DataTypes.STRING,
    time_start: DataTypes.DATEONLY,
    time_end: DataTypes.DATEONLY,
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'deleted']
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};