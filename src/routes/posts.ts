import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post';

const router = express.Router();

const cachingTime = 20 * 60 * 1000;
let cacheTime: number;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedPosts: mongoose.Document<any, Record<string, unknown>>[];

router
  .get('/', (req, res, next) => {
    if (cacheTime && Date.now() - cacheTime < cachingTime) {
      return res.json(cachedPosts);
    }

    return Post.find({}, (error, newPosts) => {
      if (!error) {
        cacheTime = Date.now();
        cachedPosts = newPosts;
        return res.json(newPosts);
      }
      return next(error);
    });
  })
  .post('/', (req, res, next) => {
    if (req.body.secretKey !== process.env.SECRET_KEY) return res.json({ message: 'Unauthorized access!' });
    const post = new Post(req.body);
    return post.save((error) => {
      if (!error) {
        return res.json(post);
      }
      if (error.name === 'ValidationError') {
        res.status(422);
      }
      return next(error);
    });
  });

export default router;
