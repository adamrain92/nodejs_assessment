'use strict';
module.exports = (sequelize, DataTypes) => {
  var Register = sequelize.define('Register', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    teacherEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  });

  return Register;
};