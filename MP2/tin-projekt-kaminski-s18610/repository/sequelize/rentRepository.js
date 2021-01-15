const Sequelize = require('sequelize');

const Rent = require('../../model/sequelize/rent');
const Customer = require('../../model/sequelize/customers');
const Book = require('../../model/sequelize/books');

exports.getRents = () => {
    return Rent.findAll({
        include: [
        {
            model: Customer,
            as: 'customer'
        },
        {
            model: Book,
            as: 'book'
        }]
    });
};


exports.getRentById = (rentId) => {
    return Rent.findByPk(rentId, {
        include: [
            {
                model: Customer,
                as: 'customer'
            },
            {
                model: Book,
                as: 'book'
            }]
    });
};

exports.createRent = (data) => {
    console.log(JSON.stringify(data));

    return Rent.create({
        customer_id: data.customer_id,
        book_id: data.book_id,
        delivery_address: data.delivery_address,
        rent_date: data.rent_date,
        return_date: data.return_date
    });
};

exports.updateRent = (rentId, data) => {
    return Rent.update(data, {where: {_id: rentId }});
}

exports.deleteRent = (rentId) => {
    return Rent.destroy({
        where: { _id: rentId }
    });
}

exports.deleteManyRents = (rentIds) => {
    return Rent.find({ _id: { [Sequelize.Op.in]: rentIds }})
}