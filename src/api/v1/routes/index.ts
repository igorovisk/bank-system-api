import { UserRouter } from './user';
import { AuthRouter } from './auth';
import { Router } from 'express';

const v1 = Router();
v1.use(UserRouter);
v1.use(AuthRouter);

export { v1 };
