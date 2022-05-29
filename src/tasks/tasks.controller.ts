import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { DeleteTaskParams } from './dto/delete-task.dto';
import { GetTaskByIdParams } from './dto/get-task-by-id.dto';
import { GetTasksDTO } from './dto/get-tasks.dto';
import { UpdateTaskDTO, UpdateTaskParams } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() getTasksDTO: GetTasksDTO): Promise<Task[]> {
        return this.tasksService.getTasks(getTasksDTO)
    }

    @Get(':id')
    async getTaskById(@Param() getTaskByIdParams: GetTaskByIdParams): Promise<Task> {
        const { id } = getTaskByIdParams;

        return await this.tasksService.getTaskById(id);
    }

    @Post()
    async createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
        return await this.tasksService.createTask(createTaskDTO);
    }

    @Patch(':id')
    updateTask(
        @Param() updateTaskParams: UpdateTaskParams,
        @Body() updateTaskDTO: UpdateTaskDTO
    ): Promise<string> {
        const { id } = updateTaskParams;

        return this.tasksService.updateTask(id, updateTaskDTO);
    }

    @Delete(':id')
    async deleteTask(@Param() deleteTaskParams: DeleteTaskParams): Promise<string> {
        const { id } = deleteTaskParams;

        return await this.tasksService.deleteTask(id);
    }
}
