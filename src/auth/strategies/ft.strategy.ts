import { HttpService } from "@nestjs/axios";
import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";
import { lastValueFrom } from "rxjs";

@Injectable()
export class FortytwoStrategy extends PassportStrategy(Strategy, 'ft') {
	constructor(private http: HttpService, configService: ConfigService) { 
		super({
			authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${configService.get('42_CLIENT_ID')}&redirect_uri=${configService.get('42_CLIENT_CALLBACK')}&response_type=code`,
			tokenURL: 'https://api.intra.42.fr/oauth/token',
			scope: 'profile',
			clientID: configService.get('42_CLIENT_ID'),
			clientSecret: configService.get('42_CLIENT_SECRET'),
			callbackURL: configService.get('42_CLIENT_CALLBACK'),
		});
	}

	async validate(
		accessToken: string,
	): Promise<any> {
		console.log("AccessToken Value : " + accessToken);
		const req = this.http.get('https://api.intra.42.fr/v2/me', {
			headers: { Authorization: `Bearer ${ accessToken }` },
		})
		try {
			const { data } = await lastValueFrom(req);
			if (!data) {
				throw new UnauthorizedException();
			}
			return data;
		} catch (error) {
			throw new ForbiddenException();
		}
	}
}