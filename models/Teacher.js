/* jshint indent: 2 */

'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Teacher;
};