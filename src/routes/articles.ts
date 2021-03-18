import express from 'express';
import Article from '../models/Article';

const router = express.Router();

router.get('/', async (req: any, res: any, next: any) => {
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
