import express from 'express';

import { kSecretKey } from '../constants';
import Post from '../models/Post';

const router = express.Router();

router
  .get('/', async (_req, res, next) => {
    try {
      const posts = await Post.find({}).lean();
      return res.json(posts.map((post) => Post.toClient(post)));
    } catch (error) {
      return next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const post = await Post.findById(id).lean();
      if (!post) {
        res.status(404);
        return next(new Error('Post not found.'));
      }

      return res.json(Post.toClient(post));
    } catch (error) {
      res.status(400);
      return next(error);
    }
  })
  .post('/', async (req, res, next) => {
    if (!(req.body.secretKey || req.body.secretKey === kSecretKey)) {
      res.status(401);
      return res.json({ message: 'Unauthorized access!' });
    }

    const post = new Post(req.body);
    try {
      await post.save();
      return res.json(Post.toClient(post));
    } catch (error) {
      if (error.name === 'ValidationError') res.status(422);
      return next(error);
    }
  });

export default router;
