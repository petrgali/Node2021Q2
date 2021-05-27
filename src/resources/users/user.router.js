const router = require('express').Router();
const User = require('./user.model');
const { serviceAPI } = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await serviceAPI.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await serviceAPI.addNewRecord(req.body);
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
  const user = await serviceAPI.getById(req.params.id);
  res.status(user ? 200 : 404).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const updatedUser = await serviceAPI.updateRecord(req.body, req.params);
  res.status(updatedUser ? 200 : 400).json(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req, res) => {
  await serviceAPI.deleteRecord(req.params.id);
  res.status(204).json({});
});
module.exports = router;
