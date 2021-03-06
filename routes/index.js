const express = require('express');

const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const { postRegister, postLogin, getLogout, landingPage } = require('../controllers');

/* GET User Index */
router.get('/', asyncErrorHandler(landingPage));

/* GET /register */
router.get('/register', (req, res, next) => {
	res.send('GET /register');
});

/* POST /register */
router.post('/register', asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', (req, res, next) => {
	res.send('GET /login');
});

/* POST /login */

router.post('/login', postLogin);

/*  GET /logout */

router.get('/logout', getLogout);

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
