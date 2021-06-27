import { NextFunction, Request, Response, Router } from 'express'
import Board from '../../entities/board.entity'
import { serviceAPI } from './board.service'
import { STATUS, MSG } from '../../common/const'
import { LogError } from '../../middlewares/error.logger.interface'

const router = Router()

router
  .route('/')
  .get(async (_req: Request, res: Response) => {
    const boards: Board[] = await serviceAPI.getAll()
    res.status(STATUS.OK).json(boards)
  })

router
  .route('/')
  .post(async (req: Request, res: Response) => {
    const board: Board | undefined = await serviceAPI.addNewRecord(req.body.title, req.body.columns)
    res.status(STATUS.CREATED).json(board)
  })

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const board: Board | undefined = await serviceAPI.getById(String(req.params['id']))
    if (board) {
      res.status(STATUS.OK).json(board)
      return
    }
    next(new LogError(STATUS.NOT_FOUND, MSG.NOT_FOUND, { req, res }))
  })

router
  .route('/:id')
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const updated: Board | undefined = await serviceAPI.updateRecord(String(req.params['id']), req.body.title)
    if (updated) {
      res.status(STATUS.OK).json(updated)
      return
    }
    next(new LogError(STATUS.BAD_REQUEST, MSG.BAD, { req, res }))
  })

router
  .route('/:id')
  .delete(async (req: Request, res: Response) => {
    await serviceAPI.deleteRecord(String(req.params['id']))
    res.status(STATUS.SUCCESS).json({})
  })
export default router
