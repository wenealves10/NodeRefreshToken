import dayjs from "dayjs";
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateToken } from "../../provider/GenerateToken";

class RefreshTokenUserUseCase {
	async execute(refresh_token: string) {
		if (!refresh_token) {
			throw new Error("Refresh Token invalid");
		}

		const refreshToken = await client.refreshToken.findFirst({
			where: {
				id: refresh_token,
			},
		});

		if (!refreshToken) {
			throw new Error("Refresh Token invalid");
		}

		const refreshTokenExpired = dayjs().isAfter(
			dayjs.unix(refreshToken.expireIn)
		);

		const generateToken = new GenerateToken();
		const token = await generateToken.execute(refreshToken.userId);

		if (refreshTokenExpired) {
			await client.refreshToken.deleteMany({
				where: {
					userId: refreshToken.userId,
				},
			});

			const generateRefreshToken = new GenerateRefreshToken();
			const newRefreshToken = await generateRefreshToken.execute(
				refreshToken.userId
			);

			return { token, refresh_token: newRefreshToken };
		}

		return { token };
	}
}

export { RefreshTokenUserUseCase };
