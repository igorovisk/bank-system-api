import { Express } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { ErrorHandlerMiddleware } from './error-handler';

export class AppMiddlewares {
  static loadMiddlewares(app: Express) {
    console.info('Loading CORS');
    app.use(
      cors({
        origin: '*',
        exposedHeaders: ['content-type', 'content-length'],
        maxAge: 600,
        methods: ['GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'],
        allowedHeaders: [
          'Accept',
          'Content-Type',
          'Authorization',
          'x-api-key',
          'x-access-token',
        ],
      }),
    );

    console.info('Loading BodyParser');
    app.use(bodyParser.json());

    console.info('Loading Urlencoded');
    app.use(bodyParser.urlencoded({ extended: true }));

    console.info('Loading ErrorHandlerMiddleware');
    app.use(ErrorHandlerMiddleware.get().handler);
  }
}
