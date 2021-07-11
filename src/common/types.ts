interface UserDTO {
  id?: string;
  name: string;
  login: string;
  password: string;
}

interface TaskDTO {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId?: string;
  boardId?: string;
  columnId?: string;
}

interface ColumnDTO {
  id?: string;
  title: string;
  order: number;
}

interface BoardDTO {
  id?: string;
  title: string;
  columns?: Array<ColumnDTO>
}

interface Token {
  userId: string;
  login: string
}
export {
  UserDTO,
  TaskDTO,
  ColumnDTO,
  BoardDTO,
  Token
}