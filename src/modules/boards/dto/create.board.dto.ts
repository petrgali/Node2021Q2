import { CreateColumnDTO } from 'src/modules/columns/dto/create.column.dto';

export interface CreateBoardDTO {
  id?: string;
  title?: string;
  columns?: CreateColumnDTO[];
}
