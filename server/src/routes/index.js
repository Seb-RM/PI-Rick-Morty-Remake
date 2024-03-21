const express = require("express");
const mainRouter = express.Router();

const { usersRouter } = require("./usersRoutes");
const { favoritesRouter } = require("./favoritesRoutes");


mainRouter.use("/users", usersRouter);
mainRouter.use("/favorites", favoritesRouter);

module.exports = { mainRouter };