import { Request, Response,Router } from 'express'
import { IUser } from './user.model'
import { serviceAPI } from './user.service';
import { STATUS, MSG } from '../../common/const'
import { User } from './user.model'

const router = Router()

router.route('/').get(async (_req: Request, res: Response) => {
  const users: Array<IUser> = await serviceAPI.getAll();
  res.status(STATUS.OK).json(users.map(User.toResponse));
});

router.route('/').post(async (req: Request, res: Response) => {
  const user: IUser = new User(req.body)
  serviceAPI.addNewRecord(user);
  res.status(STATUS.CREATED).json(User.toResponse(user));
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const user: IUser | undefined = await serviceAPI.getById(req.params['id']);
  if (user) {
    res.status(STATUS.OK).json(User.toResponse(user));
    return
  }
  res.status(STATUS.NOT_FOUND).json({ error: MSG.NOT_FOUND });
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const updatedUser: IUser | undefined = await serviceAPI.updateRecord(req.body, req.params['id']);
  if (updatedUser) {
    res.status(STATUS.OK).json(User.toResponse(updatedUser));
    return
  }
  res.status(STATUS.BAD_REQUEST).json({ error: MSG.BAD });
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  serviceAPI.deleteRecord(req.params['id']);
  res.status(STATUS.SUCCESS).json({});
});
export default router
