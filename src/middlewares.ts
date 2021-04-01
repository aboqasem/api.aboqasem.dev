import { NextFunction, Request, Response } from 'express';

import { __DEV__ } from './constants';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.message,
    stack: __DEV__ ? error.stack : '⚠️',
  });
};

export default { notFound, errorHandler };
