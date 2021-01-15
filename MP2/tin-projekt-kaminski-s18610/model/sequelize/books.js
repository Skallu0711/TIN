const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Book = sequelize.define('Books', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   title: {
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
   author: {
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
   publishing_company: {
       type: Sequelize.STRING,
       allowNull: true
   },
   number_of_copies: {
       type: Sequelize.INTEGER,
       allowNull: true,
       validate: {
           isNumeric: {
               msg: "Pole powinno zawierać liczbę"
           }
       }
   },
   language: {
       type: Sequelize.STRING,
       allowNull: true
   }
});

module.exports = Book;