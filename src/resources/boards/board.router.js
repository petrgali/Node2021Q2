const router = require('express').Router();
const Board = require('./board.model');
const Column = require('../columns/columns.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards);
});

router.route('/').post(async (req, res) => {
  const columns = req.body.columns.map(
    (item) =>
      new Column({
        title: item.title,
        order: item.order,
      })
  );
  const board = new Board({
    title: req.body.title,
    columns,
  });
  await boardsService.addNewRecord(board);
  res.status(201).json(board);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  res.status(board ? 200 : 404).json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  const { columns } = board;
  const update = {
    title: req.body.title,
    columns,
  };
  await boardsService.updateRecord(req.params.id, update);
  const updatedBoard = await boardsService.getById(req.params.id);
  res.status(updatedBoard ? 200 : 400).json(updatedBoard);
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.deleteRecord(req.params.id);
  res.status(204).json({});
});
module.exports = router;
