import { Request, Response, Router } from 'express'
import { serviceAPI } from './task.service';
import { STATUS, MSG } from '../../common/const'

const router = Router({ mergeParams: true })

router.route('/').get(async (req: Request, res: Response) => {
  const tasksList = await serviceAPI.getBoardTasks(req.params['boardId']);
  if (tasksList) {
    res.status(STATUS.OK).json(tasksList)
    return
  }
  res.status(STATUS.NOT_FOUND).json({ error: MSG.NOT_FOUND });
});
router.route('/').post(async (req: Request, res: Response) => {
  const task = await serviceAPI.addBoardTask(req.body, req.params['boardId']);
  res.status(STATUS.CREATED).json(task);
});
router.route('/:taskId').get(async (req: Request, res: Response) => {
  const task = await serviceAPI.getTaskById(req.params['boardId'], req.params['taskId']);
  if (task) {
    res.status(STATUS.OK).json(task);
    return
  }
  res.status(STATUS.NOT_FOUND).json({ error: MSG.NOT_FOUND });
});
router.route('/:taskId').put(async (req: Request, res: Response) => {
  const task = await serviceAPI.updateTask(req.body, req.params['boardId'], req.params['taskId']);
  res.status(STATUS.OK).json(task);
});
router.route('/:taskId').delete(async (req: Request, res: Response) => {
  await serviceAPI.deleteTask(req.params['boardId'], req.params['taskId']);
  res.status(STATUS.SUCCESS).json({});
});
export default router
