const express = require('express');
const router = express.Router();
const foodsController = require('../../../controllers/foods_controller');

router.get('/', foodsController.index);

router.get('/:id', foodsController.show);

router.post('/', foodsController.create);

router.put('/:id', foodsController.update);

router.delete('/:id', foodsController.destroy);

module.exports = router
