import { Router, Request, Response, NextFunction } from 'express';
import { TransactionController } from '../controllers';
import { RouteValidator } from './validations';
import { CreateTransactionValidator, GetTransactionValidator } from './schemas';
import { JwtTokenUtils } from '../../../utils';

const controller = new TransactionController();
const router = Router();

router
  .route('/accounts/:accountId/transactions$')
  .get(
    RouteValidator.validate(GetTransactionValidator.get()),
    (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers['x-access-token'].toString();
      JwtTokenUtils.verify(token);
      controller.getTransactions(req, res, next);
    },
  )
  .post(
    RouteValidator.validate(CreateTransactionValidator.post()),
    (req: Request, res: Response, next: NextFunction) => {
      controller.create(req, res, next);
    },
  );

export { router as TransactionRouter };
