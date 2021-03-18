import express, { Request, Response, NextFunction } from 'express';
import Post from '../models/Post';

const router = express.Router();

router.get('/', async (req, res, next) => {
  await Post.find({}, (error, posts) => {
    if (!error) {
      return res.json(posts);
    }
    return next(error);
  });
});

router.post('/', async (req, res, next) => {
  if (req.body.secretKey !== process.env.SECRET_KEY) return res.json({ message: 'Unauthorized access!' });
  const post = new Post(req.body);
  post.save((error) => {
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
