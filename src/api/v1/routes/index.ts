import { UserRouter } from './user';
import { AuthRouter } from './auth';
import { TransactionRouter } from './transaction';
import { Router } from 'express';

const v1 = Router();
v1.use(UserRouter);
v1.use(AuthRouter);
v1.use(TransactionRouter);

export { v1 };
