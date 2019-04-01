const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const {
  postIndex,
  postNew,
  postCreate,
  postShow,
  postEdit,
  postUpdate,
  postDestroy
} = require('../controllers/posts');

/* GET Posts Index */
router.get('/', asyncErrorHandler(postIndex));

/* GET Posts New */
router.get('/new', postNew);

/* POST Posts Create */
router.post('/', upload.array('images', 4), asyncErrorHandler(postCreate));

/* GET Posts Show */
router.get('/:id', asyncErrorHandler(postShow));

/* GET Posts Edit */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* Put Posts Update */
router.put('/:id', upload.array('images', 4), asyncErrorHandler(postUpdate));

/* DELETE Posts Destroy */
router.delete('/:id', asyncErrorHandler(postDestroy));

module.exports = router;
