import { Request, Response } from 'express'
import { IBoard } from './board.model'
import { serviceAPI } from './board.service';
const router = require('express').Router();

router.route('/').get(async (_req: Request, res: Response) => {
  const boards: Array<IBoard> = await serviceAPI.getAll();
  res.status(200).json(boards);
});

router.route('/').post(async (req: Request, res: Response) => {
  const board: IBoard = serviceAPI.addNewRecord(req.body.title, req.body.columns);
  res.status(201).json(board);
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const board: IBoard = await serviceAPI.getById(req.params['id']);
  res.status(board ? 200 : 404).json(board);
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const updated: IBoard = await serviceAPI.updateRecord(req.params['id'], req.body.title);
  res.status(updated ? 200 : 400).json(updated);
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  await serviceAPI.deleteRecord(req.params['id']);
  res.status(204).json({});
});
export default router;
