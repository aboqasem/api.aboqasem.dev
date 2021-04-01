import express from 'express';

import { kCachingTime, kSecretKey } from '../constants';
import Post, { IClientPost } from '../models/Post';

const router = express.Router();

let cacheTime: number;
let cachedPosts: IClientPost[];

router
  .get('/', (req, res, next) => {
    if (cacheTime && Date.now() - cacheTime < kCachingTime) {
      return res.json(cachedPosts);
    }

    return Post.find({})
      .lean()
      .then((newPosts) => {
        cacheTime = Date.now();
        cachedPosts = newPosts.map((post) => Post.toClient(post));
        return res.json(cachedPosts);
      })
      .catch((error) => next(error));
  })
  .post('/', (req, res, next) => {
    if (req.body.secretKey !== kSecretKey) {
      res.status(401);
      return res.json({ message: 'Unauthorized access!' });
    }

    const post = new Post(req.body);
    return post.save((error) => {
      if (error) {
        if (error.name === 'ValidationError') res.status(422);
        return next(error);
      }

      return res.json(Post.toClient(post));
    });
  });

export default router;
