import * as swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  apis: ['**/api/v1/routes/*.ts'],
  basePath: '/',
  swaggerDefinition: {
    info: {
      description: 'bank_system',
      title: 'NG',
      version: '1.0.0',
    },
    securityDefinitions: {
      auth: {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      },
    },
  },
};
const specs = swaggerJsdoc(options);

export default specs;
