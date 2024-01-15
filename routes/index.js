const express = require('express');
const router = express.Router;
const passport = require('passport');

router.get('/', passport.checkAuthentication, require('./controllers/homeController'));
router.use('/users', require('./userRoutes'));
router.use('/students', require('./studentRoute'));
router.use('/company', require('./companyRoute'));

module.exports = router;

