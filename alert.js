const express = require('express');
const router = express.Router();
const { sendAlert } = require('../controllers/alert');

router.post('/whatsapp', sendAlert);

module.exports = router;