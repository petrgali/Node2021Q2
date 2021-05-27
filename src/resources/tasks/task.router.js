const router = require('express').Router({ mergeParams: true });
const { serviceAPI } = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasksList = await serviceAPI.getBoardTasks(req.params.boardId);
  res.status(tasksList ? 200 : 401).json(tasksList);
});
router.route('/').post(async (req, res) => {
  const task = await serviceAPI.addBoardTask(req);
  res.status(201).json(task);
});
router.route('/:taskId').get(async (req, res) => {
  const task = await serviceAPI.getTaskById(req.params);
  res.status(task ? 200 : 404).json(task);
});
router.route('/:taskId').put(async (req, res) => {
  const task = await serviceAPI.updateTask(req.body, req.params);
  res.status(200).json(task);
});
router.route('/:taskId').delete(async (req, res) => {
  await serviceAPI.deleteTask(req.params);
  res.status(204).json({});
});
module.exports = router;
