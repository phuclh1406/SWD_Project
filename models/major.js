'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Major.hasMany(models.Student, {foreignKey: 'major_id', as: 'major_student'});
    }
  }
  Major.init({
    major_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    major_name: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['Active', 'Deactive'],
      validate: {
        isIn: {
          args: [['Active', 'Deactive']],
          msg: 'Invalid value for major.status (Active, Deactive)'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Major',
  });
  return Major;
};