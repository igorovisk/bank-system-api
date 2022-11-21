import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers';
import { RouteValidator } from './validations';
import { CreateUserValidator, GetUserValidator } from './schemas';
import { JwtTokenUtils } from '../../../utils';

const controller = new UserController();
const router = Router();

router
  .route('/users$')
  .get((req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'].toString();
    JwtTokenUtils.verify(token);
    controller.getUsers(req, res, next);
  })
  .post(
    RouteValidator.validate(CreateUserValidator.post()),
    (req: Request, res: Response, next: NextFunction) =>
      controller.create(req, res, next),
  );

router
  .route('/users/:id')
  .get(
    RouteValidator.validate(GetUserValidator.get()),
    (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers['x-access-token'].toString();
      JwtTokenUtils.verify(token), controller.getUserById(req, res, next);
    },
  );
// .delete((req: Request, res: Response, next: NextFunction) => {
// const token = req.headers['x-access-token'].toString();
//   controller.deleteUser(req, res, next);
// JwtTokenUtils.verify(token)
// })
// .put((req: Request, res: Response, next: NextFunction) => {
// const token = req.headers['x-access-token'].toString();
// JwtTokenUtils.verify(token)
//   controller.updateUser(req, res, next);
// });

export { router as UserRouter };
