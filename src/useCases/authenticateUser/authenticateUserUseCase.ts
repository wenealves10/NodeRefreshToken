import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateToken } from "../../provider/GenerateToken";

interface IRequest {
	username: string;
	password: string;
}

class AuthenticateUserUseCase {
	async execute({ username, password }: IRequest) {
		const userAlreadyExists = await client.user.findFirst({
			where: {
				username,
			},
		});

		if (!userAlreadyExists) {
			throw new Error("UserName or Password incorrect");
		}

		const passwordMatch = await compare(password, userAlreadyExists.password);

		if (!passwordMatch) {
			throw new Error("UserName or Password incorrect");
		}

		const generateToken = new GenerateToken();
		const token = await generateToken.execute(userAlreadyExists.id);

		await client.refreshToken.deleteMany({
			where: {
				userId: userAlreadyExists.id,
			},
		});

		const generateRefreshToken = new GenerateRefreshToken();
		const refreshToken = await generateRefreshToken.execute(
			userAlreadyExists.id
		);

		return { token, refreshToken };
	}
}

export { AuthenticateUserUseCase };
