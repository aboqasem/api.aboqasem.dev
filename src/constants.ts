/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, PORT, CORS_ORIGIN, DB_URL, SECRET_KEY, CACHING_TIME } = process.env;

export const __DEV__ = NODE_ENV === 'development';

export const kPort = PORT || '5000';

export const kCorsOrigin = CORS_ORIGIN || 'http://localhost/';

export const kDbUrl = DB_URL || 'mongodb://localhost/portfolio';

export const kSecretKey = SECRET_KEY;

// 30 mins default
export const kCachingTime = (CACHING_TIME ? +CACHING_TIME : 30 * 60 * 1000) || 30 * 60 * 1000;
