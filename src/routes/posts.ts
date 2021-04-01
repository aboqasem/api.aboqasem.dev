import express from 'express';

import { kSecretKey } from '../constants';
import Post from '../models/Post';

const router = express.Router();

router
  .get('/', (req, res, next) => {
    return Post.find({})
      .lean()
      .then((posts) => res.json(posts.map((post) => Post.toClient(post))))
      .catch((error) => next(error));
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
