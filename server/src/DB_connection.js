require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DEPLOY_DB_URL } = process.env;
const UserModel = require('./models/User');

const sequelize = new Sequelize(
   DEPLOY_DB_URL,
   { logging: false, native: false }
);

UserModel(sequelize);

const { User } = sequelize.models;

module.exports = {
   User,
   conn: sequelize,
};
