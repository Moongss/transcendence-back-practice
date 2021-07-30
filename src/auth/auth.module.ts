import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FortytwoStrategy } from './strategies/ft.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		HttpModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60d' },
		}),
	],
	providers: [AuthService, FortytwoStrategy, JwtStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}