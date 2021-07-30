import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne(username);
		if (user) { //to db
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any) {
		user = JSON.parse(user);
		console.log(`user : ${user}`);
		console.log(`user.login : ${user["login"]}`);
		console.log(`user.id : ${user.id}`);
		const payload = {username: user.login, sub: user.id};
		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}