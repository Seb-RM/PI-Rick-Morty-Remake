const { Router } = require("express");

const { addFavoriteHandler, getFavoritesHandler } = require("../handlers/favoritesHandlers")

const favoritesRouter = Router();

favoritesRouter.post("/:userId", addFavoriteHandler);
favoritesRouter.get("/:userId", getFavoritesHandler);

module.exports = { favoritesRouter };