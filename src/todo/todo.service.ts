import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateTodoDto } from './interfaces/dto.interface';

import Todo from './models/todo.entity'

@Injectable()
export class TodoService {
	constructor(@InjectRepository(Todo) private readonly todo: Repository<Todo>,){}

	createOneTodo(createTodoDto: ICreateTodoDto) {
		return this.todo.create(createTodoDto).save();
	}

	getTodoList() {
		return this.todo.find({
			select: ['shortDesc', 'isDone', 'createdAt'],
			order: {createdAt: -1}
		});
	}

	getDetailTodo(id: number) {
		return this.todo.findOne(id);
	}

	async toggleTodo(id: number) {
		const before = await this.todo.findOne(id);
		await this.todo.update(id, { isDone: !before.isDone});
	}

	removeOneTodo(id: number)
	{
		return this.todo.delete(id);
	}
}
