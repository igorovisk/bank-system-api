import { Router, Request, Response, NextFunction } from 'express';
import { AccountController } from '../controllers';
import { CreateAccountValidator } from './schemas';
import { RouteValidator } from './validations';

const controller = new AccountController();
const router = Router();

router
  .route('/accounts$')
  .get(
    // passport.authenticate('headerapikey', {
    //   session: false,
    //   passReqToCallback: false,
    // }),
    (req: Request, res: Response, next: NextFunction) => {
      controller.getAccounts(req, res, next);
    },
  )
  .post(
    RouteValidator.validate(CreateAccountValidator.post()),
    (req: Request, res: Response, next: NextFunction) =>
      controller.create(req, res, next),
  );

// router
//   .route('/accounts/:id')
//   .get(
//     RouteValidator.validate(GetUserValidator.get()),
//     (req: Request, res: Response, next: NextFunction) => {
//       AccountController.getUserById(req, res, next);
//     },
//   )
//   .delete((req: Request, res: Response, next: NextFunction) => {
//     AccountController.deleteUser(req, res, next);
//   })
//   .put((req: Request, res: Response, next: NextFunction) => {
//     AccountController.updateUser(req, res, next);
//   });

export { router as AccountRouter };
