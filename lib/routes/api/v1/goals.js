const express = require('express');
const router = express.Router();
const goalsController = require('../../../controllers/goals_controller');

router.get('/', goalsController.index);

router.put('/:id', goalsController.update);

module.exports = router
