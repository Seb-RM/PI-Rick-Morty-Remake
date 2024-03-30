const { Router } = require("express");

const characterRouter = Router();

router.get("/character/:id", getCharById);

module.exports = { characterRouter };
