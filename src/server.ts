import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) =>
	response.status(200).json({ message: "Hello World with Refresh Token" })
);

app.listen(3000, () => console.log("Server running on port 3000"));
