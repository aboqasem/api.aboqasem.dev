const express = require('express');

const router = express.Router();

const Article = require('../models/Article');

router.get('/', async (req, res, next) => {
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

module.exports = router;
