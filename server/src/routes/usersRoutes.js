const { Router } = require("express");

const usersRouter = Router();

usersRouterRouter.post("/", createUserHandler);
usersRouterRouter.post("/login", loginUserHandler);
usersRouterRouter.get("/:id", getUserByIdHandler);

module.exports = { usersRouter };
