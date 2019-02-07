const express = require('express');
const router = express.Router();
const goalsController = require('../../../controllers/goals_controller');

router.get('/', goalsController.index);

module.exports = router
