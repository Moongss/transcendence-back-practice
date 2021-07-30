import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(config: ConfigService) { //add authservice later
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: config.get<string>('jwt.secret'),
		});
	}

	async validate(payload: any) {
		//some validate code
		console.log(payload);
		return {id: payload.sub, username: payload.username};
	}
}