'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Otp.belongsTo(models.Student, {
        foreignKey: "student_id",
        targetKey: 'student_id',
        as: "otp_student",
      });
    }
  }
  Otp.init({
    otp_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    otp: DataTypes.STRING,
    student_id: {
      type: DataTypes.UUID
    },
  }, {
    sequelize,
    modelName: 'Otp',
  });
  return Otp;
};