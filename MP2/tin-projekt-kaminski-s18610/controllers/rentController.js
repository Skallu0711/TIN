const RentRepository = require('../repository/sequelize/rentRepository');
const CustomerRepository = require('../repository/sequelize/customerRepository');
const BookRepository = require('../repository/sequelize/bookRepository');

exports.showRentList = (req, res, next) => {
    RentRepository.getRents()
        .then(rents => {
            res.render('pages/rent/rent-list', {
                rents: rents,
                pageTitle: 'Lista wypożyczeń',
                navLocation: 'rent'
            });
        });
}

exports.showRentFormNew = (req, res, next) => {
    let allCustomers, allBooks;
    
    RentRepository.getRents()
        .then(rents => {
            allRents = rents;
            return CustomerRepository.getCustomers();
        })
        .then(customers => {
            allCustomers = customers;
            return BookRepository.getBooks();
        })
        .then(books => {
            allBooks = books;
            res.render('pages/rent/rent-form', {
                rent: {},
                allCustomers: allCustomers,
                allBooks: allBooks,
                formMode: 'createNew',
                pageTitle: 'Nowe wypożyczenie',
                btnLabel: 'Dodaj wypożyczenie',
                formAction: '/rent/add',
                navLocation: 'rent',
                validationErrors: []
            });
        });
}

exports.showRentFormEdit = (req, res, next) => {
    const rentId = req.params.rentId;
    let allCustomers, allBooks, allRents;
    
    RentRepository.getRents()
        .then(rents => {
            allRents = rents;
            return CustomerRepository.getCustomers();
        })
        .then(customers => {
            allCustomers = customers;
            return BookRepository.getBooks();
        })
        .then(books => {
            allBooks = books;
            return RentRepository.getRentById(rentId);
        })
        .then(rent => {
            res.render('pages/rent/rent-form', {
                rent: rent,
                allCustomers: allCustomers,
                allBooks: allBooks,
                allRents: allRents,
                formMode: 'edit',
                pageTitle: 'Edycja wypożyczenia',
                btnLabel: 'Edytuj wypożyczenie',
                formAction: '/rent/edit',
                navLocation: 'rent',
                validationErrors: []
            });
        });
}

exports.showRentDetails = (req, res, next) => {
    const rentId = req.params.rentId;
    let allCustomers, allBooks;
    
    CustomerRepository.getCustomers()
        .then(customers => {
            allCustomers = customers;
            return BookRepository.getBooks();
        })
        .then(books => {
            allBooks = books;
            return RentRepository.getRentById(rentId)
        })
        .then(rent => {
            res.render('pages/rent/rent-form', {
                rent: rent,
                allCustomers: allCustomers,
                allBooks: allBooks,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły wypożyczenia',
                formAction: '',
                navLocation: 'rent',
                validationErrors: []
            });
        });     
}

exports.addRent = (req, res, next) => {
    let allCustomers, allBooks, error;
    const rentData = { ...req.body };
    
    RentRepository.createRent(rentData)
        .then(result => {
            res.redirect('/rent');
        })
        .catch(err => {
            error = err;
            return CustomerRepository.getCustomers();   
        })
        .then(customers => {
            allCustomers= customers;
            return BookRepository.getBooks()
        })
        .then(books => {
            allBooks = books;
            res.render('pages/rent/rent-form', {
                rent: {},
                allCustomers: allCustomers,
                allBooks: allBooks,
                formMode: 'createNew',
                pageTitle: 'Dodawanie wypożyczenia',
                btnLabel: 'Dodaj wypożyczenie',
                formAction: '/rent/add',
                navLocation: 'rent',
                validationErrors: error.errors
            });
        });
};



exports.updateRent = (req, res, next) => {
    let allCustomers, allBooks, error;
    const rentId = req.body._id;
    const rentData = { ...req.body };
    
    RentRepository.updateRent(rentId, rentData)
        .then(result => {
            res.redirect('/rent');
        })
        .catch(err => { 
            error = err;
            return CustomerRepository.getCustomers()
        })
        .then(customers => {
            allCustomers = customers;
            return BookRepository.getBooks();
        })
        .then(books => {
            allBooks = books;
            return RentRepository.getRentById(rentId)
        })
        .then(rent => {
            res.render('pages/rent/rent-form', {
                rent: rent,
                allCustomers: allCustomers,
                allBooks: allBooks,
                formMode: 'edit',
                pageTitle: 'Edycja wypożyczenia',
                btnLabel: 'Edytuj wypożyczenie',
                formAction: '/rent/edit',
                navLocation: 'rent',
                validationErrors: error.errors
            });
        });
};

exports.deleteRent = (req, res, next) => {
    const rentId = req.params.rentId;
    
    RentRepository.deleteRent(rentId)
        .then(() => {
            res.redirect('/rent');
        })
        .catch(err => {
            res.render('pages/rent/rent-form', {
                rent: rentData,
                pageTitle: 'Usuwanie wypożyczenia',
                formMode: 'delete',
                btnLabel: 'Usuń wypożyczenie',
                formAction: '/rent/delete',
                navLocation: 'rent',
                validationErrors: []
            })
        });
};