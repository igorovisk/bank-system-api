export class AppEnvs {
  static readonly environment = process.env.NODE_ENV || 'development';

  static readonly server = {
    port: Number(process.env.PORT || '3001'),
  };

  static readonly TOKEN_CONFIG = {
    JWT: {
      EXPIRATION: Number(process.env.JWT_EXPIRATION) || 60 * 60 * 12, // 24 hours
      SECRET: process.env.JWT_SECRET || "A})D.26Gcv8!tpHg",
    },
  };
}
