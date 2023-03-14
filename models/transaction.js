'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Student, {foreignKey: 'student_id', targetKey: 'student_id', as: 'transaction_student' })
      Transaction.belongsTo(models.Deliverable, {foreignKey: 'deliverable_id', targetKey: 'deliverable_id', as: 'transaction_project'});
    }
  }
  Transaction.init({
    transaction_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    price: DataTypes.DOUBLE,
    poster_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    doer_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    deliverable_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};