import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers';
import { RouteValidator } from './validations';
import { CreateUserValidator, GetUserValidator } from './schemas';

const controller = new UserController();
const router = Router();

router
  .route('/users$')
  .get((req: Request, res: Response, next: NextFunction) => {
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
      controller.getUserById(req, res, next);
    },
  )
  .delete((req: Request, res: Response, next: NextFunction) => {
    controller.deleteUser(req, res, next);
  })
  .put((req: Request, res: Response, next: NextFunction) => {
    controller.updateUser(req, res, next);
  });

export { router as UserRouter };