import { IsUUID } from "class-validator";

export class DeleteTaskParams {
    @IsUUID()
    id: string
}
