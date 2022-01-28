const express = require('express');
const router = express.Router();
const controlRegister = require('../controllers/controlRegister');
const controlLogin = require('../controllers/controlLogin');

router.get('/login',
controlLogin.validLogin,
controlLogin.generateToken,
controlLogin.responseLogin
);

router.post('/register',
  controlRegister.validateRegister,
  controlRegister.responseRegister
);

module.exports = router;