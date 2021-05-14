const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasksList = await taskService.getBoardTasks(req.params.boardId);
  res.status(tasksList ? 200 : 401).json(tasksList.map(Task.toResponse));
});

router.route('/').post(async (req, res) => {
  const task = new Task({
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId,
  });
  await taskService.addBoardTask(task);
  res.status(201).json(Task.toResponse(task));
});

router.route('/:taskId').get(async (req, res) => {
  const task = await taskService.getTaskById({
    board: req.params.boardId,
    task: req.params.taskId,
  });
  res.status(task ? 200 : 404).json(task);
});

router.route('/:taskId').put(async (req, res) => {
  const update = {
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.body.boardId,
    columnId: req.body.columnId,
  };
  const params = {
    board: req.params.boardId,
    task: req.params.taskId,
  };
  await taskService.updateTask(params, update);
  const task = await taskService.getTaskById(params);
  res.status(200).json(task);
});
router.route('/:taskId').delete(async (req, res) => {
  await taskService.deleteTask({
    board: req.params.boardId,
    task: req.params.taskId,
  });
  res.status(204).json({});
});
module.exports = router;
