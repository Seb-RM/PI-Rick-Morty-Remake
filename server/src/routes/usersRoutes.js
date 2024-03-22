const { Router } = require("express");

const {
    createUserHandler,
    loginUserHandler,
    getUserByIdHandler
} = require("../handlers/userHandlers");

const usersRouter = Router();

usersRouter.post("/", createUserHandler);
usersRouter.post("/login", loginUserHandler);
usersRouter.get("/:id", getUserByIdHandler);

module.exports = { usersRouter };
