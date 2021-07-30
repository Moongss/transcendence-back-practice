import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	canActivate(context: ExecutionContext) {
		console.log(`DEBUG canActivate`)
		// Add your custom authentication logic here
		// for example, call super.logIn(request) to establish a session.
		return super.canActivate(context);
	}

	handleRequest(err, user, info) {
		console.log(`DEBUG err : ${err}`)
		console.log(`DEBUG: user : ${user}`)
		console.log(`DEBUG: info : ${info}`)
		// You can throw an exception based on either "info" or "err" arguments
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		return user;
	}
}