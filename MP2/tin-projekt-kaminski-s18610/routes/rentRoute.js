const express = require('express');
const router = express.Router();

const rentController = require('../controllers/rentController');

router.get('/', rentController.showRentList);
router.get('/add', rentController.showRentFormNew);
router.get('/edit/:rentId', rentController.showRentFormEdit);
router.get('/details/:rentId', rentController.showRentDetails);

router.post('/add', rentController.addRent); 
router.post('/edit', rentController.updateRent);
router.get('/delete/:rentId', rentController.deleteRent);

module.exports = router;