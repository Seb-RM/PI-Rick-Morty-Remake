const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define(
      "User",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
         favorites: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: [],
         },
      },
      { timestamps: false }
   );
};
