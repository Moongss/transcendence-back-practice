import { Body, Controller, Get, Header, Post, Redirect, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { FortyTwoAuthGuard } from "./guards/ft-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}


	@UseGuards(FortyTwoAuthGuard)
	@Get()
	@Header('Access-Control-Allow-Credentials', 'true')
	async auth(@Req() req)
	{
		console.log(`[DEBUG] : ${req.user}`);
		console.log(`[DEBUG] : ${req.user["id"]}`);
		console.log(`[DEBUG] : ${req.user["login"]}`);
		// return req.user;
		//access token send to body{json}
		// return this.authService.login(JSON.stringify(req.user)); 
		return this.authService.login(JSON.stringify(req.user)); 
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	// @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
	@Header('Access-Control-Allow-Credentials', 'true')
	getProfile(@Req() req)
	{
		console.log(`[DEBUG] req : ${req}`);
		// return "Good!";
		return (req.user);
	}
}