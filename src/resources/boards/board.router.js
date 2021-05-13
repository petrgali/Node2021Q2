const router = require('express').Router();
// const Board = require('./board.model');
// const Column = require('../columns/columns.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards);
});

// router.route('/').post(async (req, res) => {
// //   const columns = req.body.columns.map(
// //    console.log
// //   );
//   console.log(req.body);
//   const board = new Board({
//     title: req.body.title,
//     column: columns,
//   });
//   await boardsService.addNewRecord(board);
//   res.status(201).json(board);
// });

module.exports = router;
