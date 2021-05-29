import { Request, Response } from 'express'
const router = require('express').Router({ mergeParams: true });
const { serviceAPI } = require('./task.service');

router.route('/').get(async (req: Request, res: Response) => {
  const tasksList = await serviceAPI.getBoardTasks(req.params['boardId']);
  res.status(tasksList ? 200 : 401).json(tasksList);
});
router.route('/').post(async (req: Request, res: Response) => {
  const task = await serviceAPI.addBoardTask(req.body, req.params['boardId']);
  res.status(201).json(task);
});
router.route('/:taskId').get(async (req: Request, res: Response) => {
  const task = await serviceAPI.getTaskById(req.params['boardId'], req.params['taskId']);
  res.status(task ? 200 : 404).json(task);
});
router.route('/:taskId').put(async (req: Request, res: Response) => {
  const task = await serviceAPI.updateTask(req.body, req.params['boardId'], req.params['taskId']);
  res.status(200).json(task);
});
router.route('/:taskId').delete(async (req: Request, res: Response) => {
  await serviceAPI.deleteTask(req.params['boardId'], req.params['taskId']);
  res.status(204).json({});
});
module.exports = router;
