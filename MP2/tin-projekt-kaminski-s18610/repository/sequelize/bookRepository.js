const Customer = require("../../model/sequelize/customers");
const Rent = require("../../model/sequelize/rent");
const Book = require("../../model/sequelize/books");

exports.getBooks = () => {
    return Book.findAll();
};

exports.getBookById = (bookId) => {
    return Book.findByPk(bookId,
        {
            include: [{
                model: Rent,
                as: 'rents',
                include: [{
                    model: Customer,
                    as: 'customer'
                }]
            }]
        });
};

exports.createBook = (newBookData) => {
    return Book.create({
        title: newBookData.title,
        author: newBookData.author,
        publishing_company: newBookData.publishing_company,
        number_of_copies: newBookData.number_of_copies,
        language: newBookData.language
    });
};

exports.updateBook = (bookId, bookData) => {
    const title = bookData.title;
    const author = bookData.author;
    const publishing_company = bookData.publishing_company;
    const number_of_copies = bookData.number_of_copies;
    const language = bookData.language;
    return Book.update(bookData, {where: {_id: bookId }});
};

exports.deleteBook = (bookId) => {
    return Book.destroy({
        where: { _id: bookId }
    });

}; 