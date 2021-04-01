/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, PORT, CORS_ORIGIN, DB_URL, SECRET_KEY } = process.env;

export const __DEV__ = NODE_ENV === 'development';

export const kPort = PORT || '5000';

export const kCorsOrigin = CORS_ORIGIN || 'http://localhost/';

export const kDbUrl = DB_URL || 'mongodb://localhost/portfolio';

export const kSecretKey = SECRET_KEY;
