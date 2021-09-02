import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/authenticateUserController";
import { CreateUserController } from "./useCases/createUser/createUserController";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/refreshTokenUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);

router.post("/login", authenticateUserController.handle);

router.post("/refresh-token", refreshTokenUserController.handle);

router.get("/languages", ensureAuthenticated, (request, response) =>
	response.status(200).json([
		{ id: 1, name: "Javascript" },
		{ id: 2, name: "TypeScript" },
		{ id: 3, name: "Java" },
		{ id: 1, name: "C#" },
	])
);

export { router };
