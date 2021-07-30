import { Body, Controller, Get, Header, Post, Redirect, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { FortyTwoAuthGuard } from "./guards/ft-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}


	@UseGuards(FortyTwoAuthGuard)
	@Get()
	async auth(@Req() req)
	{
		//access token send to body{json}
		//return this.authService.login(JSON.stringify(req.user)); 
		return this.authService.login(JSON.stringify(req.user)); 
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Req() req)
	{
		console.log(`[DEBUG] req : ${req}`);
		return (req.user);
	}
}