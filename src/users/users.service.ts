import { Injectable } from "@nestjs/common";

export type User = any;

@Injectable()
export class UsersService {
	private readonly users: User[];

	constructor() {
		this.users = [
			{
				userId: 1,
				username: 'chlee',
				password: 'chlee',
			},
			{
				userId: 2,
				username: 'ina',
				password: 'ina',
			},
			{
				userId: 3,
				username: 'yhan',
				password: 'yhan',
			},
		]
	}

	async findOne(username: string): Promise<User | undefined> {
		return this.users.find(user => user.username === username);
	}
}