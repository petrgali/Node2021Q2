import { NextFunction, Request, Response, Router } from 'express'
import { serviceAPI } from './task.service'
import { STATUS, MSG } from '../../common/const'
import { LogError } from '../../middlewares/error.logger.interface'
import Task from '../../entities/task.entity'

const router = Router({ mergeParams: true })

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const tasksList: Task[] = await serviceAPI.getBoardTasks(req.params['boardId'])
    if (tasksList) {
      res.status(STATUS.OK).json(tasksList)
      return
    }
    next(new LogError(STATUS.NOT_FOUND, MSG.NOT_FOUND, { req, res }))
  })

router
  .route('/')
  .post(async (req: Request, res: Response) => {
    const task = await serviceAPI.addBoardTask(req.body, req.params['boardId'])
    res.status(STATUS.CREATED).json(task)
  })

router
  .route('/:taskId')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const task = await serviceAPI.getTaskById(req.params['boardId'], req.params['taskId'])
    if (task) {
      res.status(STATUS.OK).json(task)
      return
    }
    next(new LogError(STATUS.NOT_FOUND, MSG.NOT_FOUND, { req, res }))
  })

router
  .route('/:taskId')
  .put(async (req: Request, res: Response) => {
    const task = await serviceAPI.updateTask(req.body, String(req.params['boardId']), req.params['taskId'])
    res.status(STATUS.OK).json(task)
  })

router
  .route('/:taskId')
  .delete(async (req: Request, res: Response) => {
    await serviceAPI.deleteTask(req.params['boardId'], req.params['taskId'])
    res.status(STATUS.SUCCESS).json({})
  })
export default router
