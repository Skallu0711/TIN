const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Rent = sequelize.define('Rent', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   delivery_address: {
       type: Sequelize.STRING,
       allowNull: false
   },
   rent_date: {
       type: Sequelize.DATE,
       allowNull: false,
       validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
       }
   },
   return_date: {
       type: Sequelize.DATE,
       allowNull: true
   },
   customer_id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
       }
   },
   book_id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
    }
});

module.exports = Rent;