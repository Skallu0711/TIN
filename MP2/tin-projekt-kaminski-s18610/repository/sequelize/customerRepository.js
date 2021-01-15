const Customer = require("../../model/sequelize/customers");
const Rent = require("../../model/sequelize/rent");
const Book = require("../../model/sequelize/books");

exports.getCustomers = () => {
    return Customer.findAll();
};

exports.getCustomerById = (customerId) => {
    return Customer.findByPk(customerId,
        {
            include: [{
                model: Rent,
                as: 'rents',
                include: [{
                    model: Book,
                    as: 'book'
                }]
            }]
        });
};

exports.createCustomer = (newCustomerData) => {
    return Customer.create({
        name: newCustomerData.name,
        surname: newCustomerData.surname,
        address: newCustomerData.address,
        zip_code: newCustomerData.zip_code,
        email: newCustomerData.email,
        phone_number: newCustomerData.phone_number
    });
};

exports.updateCustomer = (customerId, customerData) => {
    const name = customerData.firstName;
    const surname = customerData.lastName;
    const address = customerData.address;
    const zip_code = customerData.zip_code;
    const email = customerData.email;
    const phone_number = customerData.phone_number;
    return Customer.update(customerData, {where: {_id: customerId }});
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: { _id: customerId }
    });

}; 