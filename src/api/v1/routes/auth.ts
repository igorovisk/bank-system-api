import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers';
import { RouteValidator } from './validations';

const controller = new AuthController();
const router = Router();

router
  .route('/login$')
  .post((req: Request, res: Response, next: NextFunction) => {
    console.log('rota');
    controller.login(req, res, next);
  });

export { router as AuthRouter };
