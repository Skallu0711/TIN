const BookRepository = require('../repository/sequelize/bookRepository');

exports.showBooksList = (req, res, next) => {
    BookRepository.getBooks()
        .then(books => {
            res.render('pages/books/books-list', {
                books: books,
                navLocation: 'books'
            });
        });
}

exports.showBooksFormNew = (req, res, next) => {
    res.render('pages/books/books-form', {
        book: {},
        pageTitle: 'Nowa książka',
        formMode: 'createNew',
        btnLabel: 'Dodaj książke',
        formAction: '/books/add',
        navLocation: 'books',
        validationErrors: []
    });
}

exports.showBooksFormEdit = (req, res, next) => {
    const bookId = req.params.bookId;
    
    BookRepository.getBookById(bookId)
        .then(book => {
            res.render('pages/books/books-form', {
                book: book,
                formMode: 'edit',
                pageTitle: 'Edycja książki',
                btnLabel: 'Edytuj książke',
                formAction: '/books/edit',
                navLocation: 'books',
                validationErrors: []
            });
        });
}

exports.showBooksDetails = (req, res, next) => {
    const bookId = req.params.bookId;
    
    BookRepository.getBookById(bookId)
        .then(book => {
            res.render('pages/books/books-form', {
                book: book,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły książki',
                formAction: '',
                navLocation: 'books',
                validationErrors: []
            });
        });
}

exports.addBook = (req, res, next) => {
    const bookData = { ...req.body };
    
    BookRepository.createBook(bookData)
        .then( result => {
            res.redirect('/books');
        })
        .catch(err => {
            res.render('pages/books/books-form', {
                book: bookData,
                formMode: 'createNew',
                pageTitle: 'Nowa książka',
                btnLabel: 'Dodaj książke',
                formAction: '/books/add',
                navLocation: 'books',
                validationErrors: err.errors
            })
        });
};

exports.updateBook = (req, res, next) => {
    const bookId = req.body._id;
    const bookData = { ...req.body };
    let error;
    
    BookRepository.updateBook(bookId, bookData)
        .then(result => {
            res.redirect('/books');
        })
        .catch(err => {
            error = err;
            return BookRepository.getBookById(bookId)
        })
        .then(book => {
            res.render('pages/books/books-form', {
                book: book,
                formMode: 'edit',
                pageTitle: 'Edycja książki',
                btnLabel: 'Edytuj książke',
                formAction: '/books/edit',
                navLocation: 'books',
                validationErrors: error.errors
            })
        });
};

exports.deleteBook = (req, res, next) => {
    const bookId = req.params.bookId;
    const bookData = { ...req.body };
    
    BookRepository.deleteBook(bookId)
        .then( () => {
            res.redirect('/books');
        })
        .catch(err => {
            res.render('pages/books/books-form', {
                book: bookData,
                formMode: 'delete',
                pageTitle: 'Usuwanie książki',
                btnLabel: 'Usuń książkę',
                formAction: '/books/delete',
                navLocation: 'books',
                validationErrors: []
            })
        });
};