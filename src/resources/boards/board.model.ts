import { IColumn } from '../columns/columns.model'
const uuid = require('uuid').v4;

export interface IBoard {
  id: string,
  title: string,
  columns: Array<IColumn>
}
export interface IBoardRaw {
  title?: string,
  columns?: Array<IColumn>
}
class Board {
  public id: string;
  public title: string;
  public columns: Array<IColumn>;
  constructor({ id = uuid(), title = 'TEST_BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
module.exports = Board;
