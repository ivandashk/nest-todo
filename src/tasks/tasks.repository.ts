import { InternalServerErrorException, Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksDTO } from "./dto/get-tasks.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    private logger = new Logger(TasksRepository.name);

    async getTasks(getTasksDTO: GetTasksDTO): Promise<Task[]> {
        const { status, search } = getTasksDTO;

            const query = this.createQueryBuilder('task');

            if (status) {
                query.andWhere('task.status123 = :status', { status })
            }

            if (search) {
                const searchParam = { search: `%${search}%` };
                query
                    .andWhere('LOWER(task.title) LIKE LOWER(:search)', searchParam)
                    .orWhere('LOWER(task.description) LIKE LOWER(:search)', searchParam)
            }

        try {
            return await query.getMany();
        } catch (error) {
            this.logger.error(`${this.getTasks.name} failed with DTO ${JSON.stringify(getTasksDTO)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const { title, description } = createTaskDTO;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        try {
            await this.save(task);
            return task;
        } catch(error) {
            this.logger.error(`${this.createTask.name} failed with DTO ${JSON.stringify(createTaskDTO)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }
}