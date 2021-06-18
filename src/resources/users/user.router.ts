import User from '../../entities/user.entity'
import { NextFunction, Request, Response, Router } from 'express'
import { serviceAPI } from './user.service'
import { STATUS, MSG } from '../../common/const'
import { LogError } from '../../middlewares/error.logger.interface'

const router = Router()

router
  .route('/')
  .get(async (_req: Request, res: Response) => {
    const users: Array<User> = await serviceAPI.getAll()
    res.status(STATUS.OK).json(users)
  })

router
  .route('/')
  .post(async (req: Request, res: Response) => {
    const saved = serviceAPI.addNewRecord(req.body)
    res.status(STATUS.CREATED).json(saved)
  })

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const user: User | undefined = await serviceAPI.getById(String(req.params['id']))
    if (user) {
      res.status(STATUS.OK).json(user)
      return
    }
    next(new LogError(STATUS.NOT_FOUND, MSG.NOT_FOUND, { req, res }))
  })

router
  .route('/:id')
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const updatedUser: User | undefined = await serviceAPI.updateRecord(req.body, String(req.params['id']))
    if (updatedUser) {
      res.status(STATUS.OK).json(updatedUser)
      return
    }
    next(new LogError(STATUS.BAD_REQUEST, MSG.BAD, { req, res }))
  })

router
  .route('/:id')
  .delete(async (req: Request, res: Response) => {
    serviceAPI.deleteRecord(String(req.params['id']))
    res.status(STATUS.SUCCESS).json({})
  })
export default router
