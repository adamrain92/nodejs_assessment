'use strict';
module.exports = (sequelize, DataTypes) => {
  var Register = sequelize.define('Register', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  });

  return Register;
};