const express = require('express');
const router = express.Router();

const CustomerApiController = require('../../api/CustomerAPI');

router.get('/', CustomerApiController.getCustomers);
router.get('/:customerId', CustomerApiController.getCustomerById);
router.post('/', CustomerApiController.createCustomer);
router.put('/:customerId', CustomerApiController.updateCustomer);
router.delete('/:customerId', CustomerApiController.deleteCustomer);

module.exports = router;