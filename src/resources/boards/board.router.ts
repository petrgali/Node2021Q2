import { NextFunction, Request, Response, Router } from 'express'
import { IBoard } from './board.model'
import { serviceAPI } from './board.service';
import { STATUS, MSG } from '../../common/const'
import { LogError } from '../../middlewares/error.logger.interface';

const router = Router();

router.route('/').get(async (_req: Request, res: Response) => {
  const boards: Array<IBoard> = await serviceAPI.getAll();
  res.status(STATUS.OK).json(boards);
});

router.route('/').post(async (req: Request, res: Response) => {
  const board: IBoard = serviceAPI.addNewRecord(req.body.title, req.body.columns);
  res.status(STATUS.CREATED).json(board);
});

router.route('/:id').get(async (req: Request, res: Response, next: NextFunction) => {
  const board: IBoard = await serviceAPI.getById(req.params['id']);
  if (board) {
    res.status(STATUS.OK).json(board)
    return
  }
  next(new LogError(STATUS.NOT_FOUND, MSG.NOT_FOUND, { req, res }))
});

router.route('/:id').put(async (req: Request, res: Response, next: NextFunction) => {
  const updated: IBoard = await serviceAPI.updateRecord(req.params['id'], req.body.title);
  if (updated) {
    res.status(STATUS.OK).json(updated)
    return
  }
  next(new LogError(STATUS.BAD_REQUEST, MSG.BAD, { req, res }));
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  await serviceAPI.deleteRecord(req.params['id']);
  res.status(STATUS.SUCCESS).json({});
});
export default router;
