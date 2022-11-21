import { NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import { TokenExpiredError } from 'jsonwebtoken';
import { AppEnvs } from '../../config/envs/app-envs';

export class JwtTokenUtils {
  static createToken(
    data: object,
    expiration: number = Number(process.env.JWT_EXPIRATION),
  ): string {
    return JWT.sign(data, process.env.JWT_SECRET, {
      expiresIn: expiration,
    });
  }

  static verify(token: string) {
    try {
      const result = JWT.verify(token, process.env.JWT_SECRET);
      return result;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        console.warn(`Expired Token: ${token}`);
        throw new Error(`Expired Token: ${token}`);
      }
      console.error(`Error while validating JWT Token: ${token} `, err);
      throw new Error(`Token: ${token} é inválido`);
    }
  }
}
