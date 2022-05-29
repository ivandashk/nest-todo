import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksDTO } from './dto/get-tasks.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ) {}

    getTasks(getTasksDTO: GetTasksDTO): Promise<Task[]> {
        return this.tasksRepository.getTasks(getTasksDTO);
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with id: ${id} not found`);
        }

        return found;
    }

    createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDTO);
    }

    async updateTask(id: string, updateTaskDTO: UpdateTaskDTO): Promise<string> {
        await this.tasksRepository.update(id, updateTaskDTO);
        return id;
    }

    async deleteTask(id: string): Promise<string> {
        const task = await this.getTaskById(id);
        await this.tasksRepository.remove(task);
        return id;
    }
}
