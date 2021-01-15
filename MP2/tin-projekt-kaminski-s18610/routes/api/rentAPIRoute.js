const express = require('express');
const router = express.Router();

const rentApiController = require('../../api/rentAPI');

router.get('/', rentApiController.getRents);
router.get('/:rentId', rentApiController.getRentById);
router.post('/', rentApiController.createRent);
router.put('/:rentId', rentApiController.updateRent);
router.delete('/:rentId', rentApiController.deleteRent);

module.exports = router;