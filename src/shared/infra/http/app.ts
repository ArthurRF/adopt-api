import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';

import { AppError } from '@shared/errors/app.error';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '@shared/docs/swagger.json';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import routes from './routes';

const app = express();

app.use(helmet());

app.use(
  express.urlencoded({ limit: '10mb', extended: false, parameterLimit: 50000 })
);
app.use(express.json({ limit: '10mb' }));
app.disable('x-powered-by');

app.use(cors());
app.use(routes);

/**
 * When wanting to use a session config
 */
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET as string,
//     saveUninitialized: false,
//     unset: 'destroy',
//     resave: false,
//   })
// );

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

process.on('SIGTERM', () => {
  process.exit(0);
});

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    const traceId = randomUUID();
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        type: 'app',
        traceId,
      });
    }

    if (error instanceof z.ZodError) {
      return response.status(400).json({
        status: 'error',
        message: error.issues,
        type: 'zod',
        traceId,
      });
    }

    console.log(traceId);
    console.log(error);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error - not treated',
      type: 'unknown',
      traceId,
    });
  }
);

export default app;
