import { sign } from "jsonwebtoken";

class GenerateToken {
	async execute(userId: string) {
		const token = sign({}, process.env.SECRET_JSONWEBTOKEN, {
			subject: userId,
			expiresIn: "20s",
		});

		return token;
	}
}

export { GenerateToken };
