const router = require('express').Router();
const { serviceAPI } = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await serviceAPI.getAll();
  res.status(200).json(boards);
});

router.route('/').post(async (req, res) => {
  const board = await serviceAPI.addNewRecord(req.body);
  res.status(201).json(board);
});

router.route('/:id').get(async (req, res) => {
  const board = await serviceAPI.getById(req.params.id);
  res.status(board ? 200 : 404).json(board);
});

router.route('/:id').put(async (req, res) => {
  const updated = await serviceAPI.updateRecord(req);
  res.status(updated ? 200 : 400).json(updated);
});

router.route('/:id').delete(async (req, res) => {
  await serviceAPI.deleteRecord(req.params.id);
  res.status(204).json({});
});
module.exports = router;
