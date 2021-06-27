import { DeleteResult, getRepository, getConnection } from 'typeorm'
import { BoardDTO, ColumnDTO } from '../../common/types'
import Board from '../../entities/board.entity'
import BoardColumn from '../../entities/columns.entity'

const boardAPI = {
  getAll: async (): Promise<Board[]> =>
    getRepository(Board).find({ relations: ['columns'] }),

  getById: async (idx: string): Promise<Board | undefined> =>
    getRepository(Board).findOne(idx, { relations: ['columns'] }),

  addNewRecord: async (title: string, data: ColumnDTO[]): Promise<Board | undefined> => {
    const connection = getConnection()
    const newBoard = new Board()
    newBoard.title = title
    const saved = await connection.manager.save(newBoard)

    for (const column of data) {
      const newColumn = new BoardColumn()
      newColumn.order = column.order
      newColumn.title = column.title
      newColumn.board = newBoard.id
      await connection.manager.save(newColumn)
    }
    return boardAPI.getById(saved.id)
  },

  updateRecord: async (id: string, data: BoardDTO): Promise<Board> =>
    (await getRepository(Board).update(id, data)).raw,

  deleteRecord: async (idx: string): Promise<DeleteResult> =>
    getRepository(Board).delete(idx),
}

export default boardAPI
