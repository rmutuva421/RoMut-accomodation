const express = require('express');
const router = express.Router();
const { sendSMS } = require('../controllers/smsAlert');

router.post('/send', sendSMS);

module.exports = router;