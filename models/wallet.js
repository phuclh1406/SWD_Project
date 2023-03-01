'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.Student, {foreignKey: 'student_id', targetKey: 'student_id', as: 'wallet_student'});
    }
  }
  Wallet.init({
    wallet_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    wallet_name: DataTypes.STRING,
    student_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Active", "Deactive"],
      validate: {
        isIn: {
          args: [['Active', 'Deactive']],
          msg: 'Invalid value for wallet.status (Active, Deactive)'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};