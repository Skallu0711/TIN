const RentRepository = require('../repository/sequelize/rentRepository');

exports.getRents = (req, res, next) => {
    RentRepository.getRents()
        .then(rents => {
            res.status(200).json(rents);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getRentById = (req, res, next) => {
    const rentId = req.params.rentId;
    
    RentRepository.getRentById(rentId)
        .then(rent => {
            if (!rent) {
                res.status(404).json({
                    message: 'Rent with id: ' + rentId + ' not found'
                })
            } else {
                res.status(200).json(rent);
            }
        });
};

exports.createRent = (req, res, next) => {
    RentRepository.createRent(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateRent = (req, res, next) => {
    const rentId = req.params.rentId;
    
    RentRepository.updateRent(rentId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Rent updated!', rent: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteRent = (req, res, next) => {
    const rentId = req.params.rentId;
    
    RentRepository.deleteRent(rentId)
        .then(result => {
            res.status(200).json({ message: 'Removed rent', rent: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};