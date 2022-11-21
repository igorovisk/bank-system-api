export class AppEnvs {
  static readonly environment = process.env.NODE_ENV || 'development';

  static readonly server = {
    port: Number(process.env.PORT || '3001'),
  };

  static readonly TOKEN_CONFIG = {
    JWT: {
      EXPIRATION: Number(process.env.JWT_EXPIRATION),
      SECRET: process.env.JWT_SECRET,
    },
  };
}
