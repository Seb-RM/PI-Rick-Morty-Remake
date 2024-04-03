const { Router } = require("express");

const { getCharacterByIdHandler } = require("../handlers/characterHandlers");

const charactersRouter = Router();

charactersRouter.get("/:id", getCharacterByIdHandler);

module.exports = { charactersRouter };
