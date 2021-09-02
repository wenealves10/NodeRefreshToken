import dayjs from "dayjs";
import { client } from "../prisma/client";

class GenerateRefreshToken {
	async execute(userId: string) {
		const generateRefreshToken = await client.refreshToken.create({
			data: {
				userId,
				expireIn: dayjs().add(15, "second").unix(),
			},
		});

		return generateRefreshToken;
	}
}

export { GenerateRefreshToken };
