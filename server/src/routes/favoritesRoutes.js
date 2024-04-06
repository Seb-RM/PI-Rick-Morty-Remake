const { Router } = require("express");

const { addFavoriteHandler, deleteFavoriteHandler, getFavoritesHandler } = require("../handlers/favoritesHandlers")

const favoritesRouter = Router();

favoritesRouter.post("/:userId", addFavoriteHandler);
favoritesRouter.put("/:userId", deleteFavoriteHandler);
favoritesRouter.get("/:userId", getFavoritesHandler);

module.exports = { favoritesRouter };