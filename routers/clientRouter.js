const express = require('express');
const router = express.Router();
const controlRegister = require('../controllers/controlRegister');

router.post('/register',
  controlRegister.validateRegister,
  controlRegister.responseRegister
);

module.exports = router;