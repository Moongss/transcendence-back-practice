import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

import Todo from './todo/models/todo.entity'
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
	TypeOrmModule.forRoot({
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "postgres",
		password: "1234",
		database: "todo_db",
		entities: [Todo],
		synchronize: true
	}),
	ConfigModule.forRoot({
		isGlobal: true,
		envFilePath: '.env.fortytwo',
	}),
	TodoModule,
	AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
