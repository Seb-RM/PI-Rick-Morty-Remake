const express = require("express");
const mainRouter = express.Router();

const { usersRouter } = require("./usersRoutes");
const { favoritesRouter } = require("./favoritesRoutes");
const { charactersRouter } = require("./characterRoutes");


mainRouter.use("/users", usersRouter);
mainRouter.use("/characters", charactersRouter);
mainRouter.use("/favorites", favoritesRouter);

module.exports = { mainRouter };