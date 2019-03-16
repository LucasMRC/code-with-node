const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware');
const { getPosts, newPost } = require('../controllers/posts');

/* GET Posts Index */
router.get('/', errorHandler(getPosts));

/* GET Posts New */
router.get('/new', newPost);

/* POST Posts Create */
router.post('/', (req, res, next) => {
  res.send('CREATE /posts');
});

/* GET Posts Show */
router.get('/:id', (req, res, next) => {
  res.send('SHOW /posts/:id');
});

/* GET Posts Edit */
router.get('/:id/edit', (req, res, next) => {
  res.send('EDIT /posts/:id/edit');
});

/* Put Posts Update */
router.put('/:id', (req, res, next) => {
  res.send('UPDATE /posts:id');
});

/* DELETE Posts Destroy */
router.delete('/:id', (req, res, next) => {
  res.send('DESTROY /posts/:id');
});

module.exports = router;
