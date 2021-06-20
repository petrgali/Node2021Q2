import API from './board.memory.repository'
import { ColumnDTO } from '../../common/types'
import Board from '../../entities/board.entity'
import { DeleteResult } from 'typeorm'

export const serviceAPI = {
  getAll: (): Promise<Board[]> => API.getAll(),

  getById: (idx: string): Promise<Board | undefined> => API.getById(idx),

  addNewRecord: (title: string, data: ColumnDTO[]): Promise<Board | undefined> => API.addNewRecord(title, data),

  updateRecord: async (id: string, title: string): Promise<Board | undefined> => {
    await API.updateRecord(id, { title: title })
    return API.getById(id)
  },

  deleteRecord: async (idx: string): Promise<DeleteResult> => API.deleteRecord(idx)
}
