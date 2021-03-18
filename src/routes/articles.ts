import express, { Request, Response, NextFunction } from 'express';
import Article from '../models/Article';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await Article.find({}, (error, articles) => {
    if (!error) {
      return res.json(articles);
    }
    return next(error);
  });
});

// router.post('/', async (req, res, next) => {
//   const article = new Article(req.body);
//   await article.save((error) => {
//     if (!error) {
//       return res.json(article);
//     }
//     if (error.name === 'ValidationError') {
//       res.status(422);
//     }
//     return next(error);
//   });
// });

export default router;
