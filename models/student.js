"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.Role, {
        foreignKey: "role_id",
        targetKey: 'role_id',
        as: "student_role",
      });
      Student.hasMany(models.Project, {as: "student_project" , foreignKey: 'poster_id'});
      Student.hasMany(models.Otp, {as: "student_otp" , foreignKey: 'student_id'});
      Student.belongsTo(models.Major, {
        foreignKey: "major_id",
        targetKey: 'major_id',
        as: "student_major",
      });
      // Student.hasMany(models.JobPost, {as: 'student_post', foreignKey: 'doer_id'});

      Student.hasOne(models.Project, {as: 'doer_project', foreignKey: 'doer_id'});
      
      Student.belongsToMany(models.Project, {
        through: 'Application',
        foreignKey: 'student_id',
        otherKey: 'project_id',
        as: "student_application",
      });

      Student.belongsToMany(models.Deliverable, {through: models.Transaction });
      Student.hasMany(models.Transaction, {as: "student_transaction", foreignKey: 'student_id'});
    }
  }
  Student.init(
    {
      student_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      student_name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      // birthday: DataTypes.DATEONLY,
      avatar: DataTypes.STRING,
      // address: DataTypes.STRING,
      // phone: DataTypes.INTEGER(10),
      portfolio: DataTypes.STRING,
      role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      major_id: {
        type: DataTypes.UUID
      },
      refresh_token: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["Active", "Deactive"],
        validate: {
          isIn: {
            args: [["Active", "Deactive"]],
            msg: 'Invalid value for student.status (Active, Deactive)'
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
