import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { __DEV__, kCorsOrigin, kDbUrl, kPort } from './constants';
import middlewares from './middlewares';
import indexRouter from './routes/index';
import postsRouter from './routes/posts';

const app = express();

mongoose.connect(kDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: kCorsOrigin }));

app.use('/', indexRouter);
app.use('/posts', postsRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(kPort, () => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${kPort}/`);
  }
});
