import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configFile from './config'

@Module({
  imports: [
	ConfigModule.forRoot({
		isGlobal: true,
		// ignoreEnvFile: true,
		load: [configFile],
	}),
	TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (config: ConfigService) => ({
			type: "postgres",
			host: config.get<string>('database.host'),
			port: config.get<number>('database.port'),
			username: config.get<string>('database.user'),
			password: config.get<string>('database.password'),
			database: config.get<string>('database.name'),
			entities: [], //add entity later
			synchronize: true,
		}),
	}),
	AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
