const express = require('express');
const router = express.Router({ mergeParams: true });

/* GET reviews Index */
router.get('/', (req, res, next) => {
  res.send('INDEX /posts/:id/reviews');
});

/* POST reviews Create */
router.post('/', (req, res, next) => {
  res.send('CREATE /posts/:id/reviews');
});

/* GET reviews Edit */
router.get('/:review_id/edit', (req, res, next) => {
  res.send('EDIT /posts/:id/reviews/:id/edit');
});

/* Put reviews Update */
router.put('/:review_id', (req, res, next) => {
  res.send('UPDATE /posts/:id/reviews:id');
});

/* DELETE reviews Destroy */
router.delete('/:review_id', (req, res, next) => {
  res.send('DESTROY /posts/:id/reviews/:id');
});

module.exports = router;
