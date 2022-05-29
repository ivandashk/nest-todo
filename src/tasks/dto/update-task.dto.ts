import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class UpdateTaskParams {
    @IsUUID()
    id: string
}

export class UpdateTaskDTO {
    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}
