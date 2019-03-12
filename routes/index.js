const express = require('express');
const router = express.Router();

/* GET User Index */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf Shop - Home' });
});

/* GET /register */
router.get('/register', (req, res, next) => {
  res.send('GET /register');
});

/* POST /register */
router.post('/register', (req, res, next) => {
  res.send('POST /register');
});

/* GET /login */
router.get('/login', (req, res, next) => {
  res.send('GET /login');
});

/* POST /login */
router.post('/login', (req, res, next) => {
  res.send('POST /login');
});

/* GET /profile */
router.get('/profile', (req, res, next) => {
  res.send('GET /profile');
});

/* PUT /profile/:user_id */
router.put('/profile/:user_id', (req, res, next) => {
  res.send('PUT /profile/:user_id');
});

/* GET /recover */
router.get('/recover', (req, res, next) => {
  res.send('GET /recover');
});

/* PUT /recover */
router.put('/recover', (req, res, next) => {
  res.send('PUT /recover');
});

/* GET /reset/:token */
router.get('/reset/:token', (req, res, next) => {
  res.send('GET /reset/:token');
});

/* PUT /reset/:token */
router.put('/reset/:token', (req, res, next) => {
  res.send('PUT /reset/:token');
});

module.exports = router;
