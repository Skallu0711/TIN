const CustomerRepository = require('../repository/sequelize/customerRepository');

exports.showCustomersList = (req, res, next) => {
    CustomerRepository.getCustomers()
        .then(customers => {
            res.render('pages/customers/customers-list', {
                customers: customers,
                navLocation: 'customers'
            });
        });
}

exports.showCustomersFormNew = (req, res, next) => {
        res.render('pages/customers/customers-form', {
        customer: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/customers/add',
        navLocation: 'customers',
        validationErrors: []
    });
}

exports.showCustomersFormEdit = (req, res, next) => {
    const customerId = req.params.customerId;
    
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customers/customers-form', {
                customer: customer,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '/customers/edit',
                navLocation: 'customers',
                validationErrors: []
            });
        });
}

exports.showCustomersDetails = (req, res, next) => {
    const customerId = req.params.customerId;
    
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customers/customers-form', {
                customer: customer,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły klienta',
                formAction: '',
                navLocation: 'customers',
                validationErrors: []
            });
        });
}

exports.addCustomer = (req, res, next) => {
    const customerData = { ...req.body };
    
    CustomerRepository.createCustomer(customerData)
        .then( result => {
            res.redirect('/customers');
        })
        .catch(err => {
            res.render('pages/customers/customers-form', {
                customer: customerData,
                pageTitle: 'Nowy klient',
                formMode: 'createNew',
                btnLabel: 'Dodaj klienta',
                formAction: '/customers/add',
                navLocation: 'customers',
                validationErrors: err.errors
            })
        });
};

exports.updateCustomer = (req, res, next) => {
    const customerId = req.body._id;
    const customerData = { ...req.body };
    let error;
    
    CustomerRepository.updateCustomer(customerId, customerData)
        .then(result => {
            res.redirect('/customers');
        })
        .catch(err => {
            error = err;
            return CustomerRepository.getCustomerById(customerId)
        })
        .then(customer => {
            res.render('pages/customers/customers-form', {
                customer: customer,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '/customers/edit',
                navLocation: 'customers',
                validationErrors: error.errors
            })
        });
};

exports.deleteCustomer = (req, res, next) => {
    const customerId = req.params.customerId;
    const customerData = { ...req.body };
    
    CustomerRepository.deleteCustomer(customerId)
        .then( () => {
            res.redirect('/customers');
        })
        .catch(err => {
            res.render('pages/customers/customer-form', {
                customer: customerData,
                formMode: 'delete',
                pageTitle: 'Usuń klienta',
                btnLabel: 'Usuń klienta',
                formAction: '/customers/delete',
                navLocation: 'customers',
                validationErrors: []
            })
        });
};