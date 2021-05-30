import { IColumn } from '../columns/columns.model'
const uuid = require('uuid').v4;
export { IBoard, IBoardRaw }

interface IBoard {
  id: string,
  title: string,
  columns: Array<IColumn>
}
interface IBoardRaw {
  title?: string,
  columns?: Array<IColumn>
}

class Board {
  public id: string;
  public title: string;
  public columns: Array<IColumn>;
  constructor({ id = uuid(), title = 'TEST_BOARD', columns = [] as IColumn[] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
export default Board;