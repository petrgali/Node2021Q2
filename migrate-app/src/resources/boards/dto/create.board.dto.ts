import { CreateColumnDTO } from "src/resources/columns/dto/create.column.dto";

export interface CreateBoardDTO {
    id?: string;
    title?: string,
    columns?: CreateColumnDTO[]
}