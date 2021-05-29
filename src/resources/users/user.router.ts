import { Request, Response } from 'express'
import { IUser } from './user.model'
const router = require('express').Router();
const User = require('./user.model');
const { serviceAPI } = require('./user.service');

router.route('/').get(async (_req: Request, res: Response) => {
  const users: Array<IUser> = await serviceAPI.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/').post(async (req: Request, res: Response) => {
  const user: IUser = new User(req.body)
  await serviceAPI.addNewRecord(user);
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const user: IUser = await serviceAPI.getById(req.params['id']);
  res.status(user ? 200 : 404).json(User.toResponse(user));
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const updatedUser: IUser = await serviceAPI.updateRecord(req.body, req.params['id']);
  res.status(updatedUser ? 200 : 400).json(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  await serviceAPI.deleteRecord(req.params['id']);
  res.status(204).json({});
});
module.exports = router;
