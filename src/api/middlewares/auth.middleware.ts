const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
const secret = process.env.JWT_SECRET;

export const authCheck = function (
  req: Request,
) {
  const token = req.headers['x-access-token'];
  jwt.verify(token, secret, (err: any) => {
    if (err) {
     throw new Error('Favor logar no sistema para continuar a operação.')
    }
  });
};
