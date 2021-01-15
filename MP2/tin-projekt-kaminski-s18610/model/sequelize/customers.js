const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Customer = sequelize.define('Customers', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   name: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
           len: {
               args: [3, 60],
               msg: "Pole powinno zawierac od 3 do 60 znaków"
           },
       }
   },
   surname: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
           len: {
               args: [3, 60],
               msg: "Pole powinno zawierac od 3 do 60 znaków"
           },
       }
   },
   address: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
           len: {
               args: [3, 60],
               msg: "Pole powinno zawierac od 3 do 60 znaków"
           },
       }
   },
   zip_code: {
       type: Sequelize.STRING,
       allowNull: false,
       unique: true
   },
   email: {
       type: Sequelize.STRING,
       allowNull: true,
       unique: true,
       validate: {
           isEmail: {
               msg: "Pole powinno zawierać prawidłowy adres email zgodny ze wzorcem"
           },
       }
   },
   phone_number: {
       type: Sequelize.STRING,
       allowNull: false,
       unique: true,
       validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
           len: {
               args: [3, 60],
               msg: "Pole powinno zawierac od 3 do 60 znaków"
           }
       }
   }
});

module.exports = Customer;