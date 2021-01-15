const express = require('express');
const router = express.Router();

const customersController = require('../controllers/customersController');

router.get('/', customersController.showCustomersList);
router.get('/add', customersController.showCustomersFormNew);
router.get('/edit/:customerId', customersController.showCustomersFormEdit);
router.get('/details/:customerId', customersController.showCustomersDetails);

router.post('/add', customersController.addCustomer); 
router.post('/edit', customersController.updateCustomer);
router.get('/delete/:customerId', customersController.deleteCustomer);

module.exports = router;