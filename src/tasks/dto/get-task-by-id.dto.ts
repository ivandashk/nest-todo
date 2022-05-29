import { IsUUID } from "class-validator";

export class GetTaskByIdParams {
    @IsUUID()
    id: string
}
