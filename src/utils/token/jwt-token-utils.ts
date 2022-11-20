import * as JWT from 'jsonwebtoken';
import { TokenExpiredError } from 'jsonwebtoken';

// import { AuthEnvs } from '../../envs';
import { AppEnvs } from '../../config/envs/app-envs';

export class JwtTokenUtils {
    static createToken(
        data: object,
        expiration: number = AppEnvs.TOKEN_CONFIG.JWT.EXPIRATION,
    ): string {
        return JWT.sign(data, AppEnvs.TOKEN_CONFIG.JWT.SECRET, {
            expiresIn: expiration,
        });
    }

    static verify(token: string): object {
        try {
            const result = JWT.verify(token, AppEnvs.TOKEN_CONFIG.JWT.SECRET);

            if (typeof result == 'object') {
                return result;
            }

            JSON.parse(result);
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                console.warn(`Expired Token: ${token}`);
                throw new Error(`Expired Token: ${token}`);
            }
            console.error(`Error while validating JWT Token: ${token} `, err);
            throw new Error(`Invalid Token: ${token}`);
        }
    }
}
