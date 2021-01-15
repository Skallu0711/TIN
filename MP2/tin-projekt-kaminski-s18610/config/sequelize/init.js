const sequelize = require('./sequelize');

const Customer = require('../../model/sequelize/customers');
const Book = require('../../model/sequelize/books');
const Rent = require('../../model/sequelize/rent');

module.exports = () => {
    Customer.hasMany(Rent, {as: 'rents', foreignKey: {name: 'customer_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rent.belongsTo(Customer, {as: 'customer', foreignKey: {name: 'customer_id', allowNull: false} } );
    Book.hasMany(Rent, {as: 'rents', foreignKey: {name: 'book_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Rent.belongsTo(Book, {as: 'book', foreignKey: {name: 'book_id', allowNull: false} });

    let allCustomers, allBooks;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Customer.findAll();
        })
        .then(customers => {
            if( !customers || customers.length == 0 ) {
                return Customer.bulkCreate([
                    {name: 'Jan', surname: 'Kowalski', address: 'Polna 9', zip_code: '24-132', email: 'jan.kowalski@gmail.com', phone_number: '511-032-028'},
                    {name: 'Mateusz', surname: 'Nowak', address: 'Łąkowa 12', zip_code: '05-806', email: 'adam.zielinski@acme.com', phone_number: '543-696-345'}
                ])
                .then( () => {
                    return Customer.findAll();
                });
            } else {
                return customers;
            }
        })
        .then( customers => {
            allCustomers = customers;
            return Book.findAll();
        })
        .then( books => {
            if( !books || books.length == 0 ) {
                return Book.bulkCreate([
                    { title: 'Harry Potter: The Philosophers Stone', author: 'J.K. Rowling', publishing_company: 'Media Rodzina', number_of_copies: '10', language: 'polski'},
                    { title: 'Harry Potter: The Chamber of Secrets', author: 'J.K. Rowling', publishing_company: 'Media Rodzina', number_of_copies: '15', language: 'polski'}
                ])
                .then( () => {
                    return Book.findAll();
                });
            } else {
                return books;
            }
        })
        .then( books => {
            allBooks = books;
            return Rent.findAll();
        })
        .then( rents => {
            if( !rents || rents.length == 0 ) {
                return Rent.bulkCreate([
                    {customer_id: allCustomers[0]._id, book_id: allBooks[0]._id, delivery_address: 'Polna 9', rent_date: '2001-01-01', return_date: '2009-01-01'},
                    {customer_id: allCustomers[1]._id, book_id: allBooks[1]._id, delivery_address: 'Łąkowa 12', rent_date: '2001-02-01', return_date: '2009-02-01'}
                ]);
            } else {
                return rents;
            }
        });
};