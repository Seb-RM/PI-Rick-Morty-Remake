const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define(
      "Favorite",
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
         },
         name: {
            type: DataTypes.STRING(30),
            allowNull: false,
         },
         status: {
            type: DataTypes.ENUM("Alive", "Dead", "Unknown"),
            allowNull: false,
         },
         species: {
            type: DataTypes.STRING(15),
            allowNull: false,
         },
         gender: {
            type: DataTypes.ENUM('Male','Female','Genderless','Unknown'),
            allowNull: false
         },
         origin: {
            type: DataTypes.STRING(30),
            allowNull: false
         },
         image: {
            type: DataTypes.STRING(75),
            //allowNull: false,
            isURL: true
         }
      },
      { timestamps: false }
   );
};
