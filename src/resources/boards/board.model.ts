import BoardColumn from '../../entities/columns.entity'
import { v4 as uuid } from 'uuid'

export { IBoard, IBoardRaw }

interface IBoard {
  id: string,
  title: string,
  columns: Array<BoardColumn>
}
interface IBoardRaw {
  title?: string,
  columns?: Array<BoardColumn>
}

class Board {
  public id: string;
  public title: string;
  public columns: Array<BoardColumn>;
  constructor({ id = uuid(), title = 'TEST_BOARD', columns = [] as BoardColumn[] } = {}) {
    this.id = id
    this.title = title
    this.columns = columns
  }
}
export default Board
