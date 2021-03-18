const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');
const middlewares = require('./middlewares');

const app = express();

mongoose.connect(process.env.DB || 'mongodb://localhost/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost',
  }),
);

app.use('/', indexRouter);
app.use('/api/articles', articlesRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${port}`);
  }
});
