import { v4 as uuid } from 'uuid'
export { IColumn, IColumnRaw }

interface IColumn {
  id: string,
  title: string,
  order: number
}
interface IColumnRaw {
  title: string,
  order: number
}
class Column {
  public id: string;
  public title: string;
  public order: number
  constructor({ id = uuid(), title = 'TEST_COLUMN', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
export default Column
