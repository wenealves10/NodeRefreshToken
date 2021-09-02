import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv-safe";
import { router } from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (request, response) =>
	response.status(200).json({ message: "Hello World with Refresh Token" })
);

app.use(router);

app.use(
	(error: Error, request: Request, response: Response, next: NextFunction) =>
		response.json({
			status: "Error",
			message: error.message,
		})
);

app.listen(3000, () => console.log("Server running on port 3000"));
