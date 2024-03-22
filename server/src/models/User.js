const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define(
      "User",
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
         },
         email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            isEmail: true,
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      { timestamps: false }
   );
};
