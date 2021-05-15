const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  try {
    const user = usersService.addNewRecord(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({});
  }
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.status(user ? 200 : 404).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const update = {
    name: req.body.name,
    login: req.body.login,
    password: req.body.password,
  };
  await usersService.updateRecord(req.params.id, update);
  const updatedUser = await usersService.getById(req.params.id);
  res.status(updatedUser ? 200 : 400).json(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.deleteRecord(req.params.id);
  res.status(204).json({});
});
module.exports = router;
