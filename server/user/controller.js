const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const userClass  = require('./models');
const { secret } = require('../../config/config.json');
const { result } = require('underscore');

function removeSensitiveInfo(data) {
    if (data.dataValues){
        if (data.dataValues.password) delete data.dataValues.password;
    }
};

module.exports = function() {
    const _self = {};

    _self.createUser = (req, res, callback) => {
        console.log('Creating user');

        var data = req.body
        let user = new userClass.userModel(data);
        bcrypt.hash(data.password, 12, (err, hash) => {
            if (err) callback(err);
            user.password = hash
            user.save()
            .then((result) => {
                removeSensitiveInfo(result)
                callback(null, result);
            })
            .catch((err) => {callback(err)})
        });
    };

    _self.authendicate = (req, res, callback) => {
        console.log('Validating User');

        userClass.userModel
        .findOne({
            where: {
                [Op.or]:[{username: req.body.username}, {email: req.body.email}]
            }
        })
        .then((result) => {
            bcrypt.compare(req.body.password, result.password, (err, validPassword) => {
                if (validPassword) {
                    result.dataValues.token = jwt.sign({ sub: result.id }, secret, { expiresIn: '3h' });
                    removeSensitiveInfo(result);
                    callback(null, result);
                } else {
                    callback('Username or password mismatched!');
                }
            });
        })
        .catch((err) => {
            callback(err)
        })
    };

    _self.createUserdetails = (req, res, callback) => {
        console.log('Creating user details');

        const userDetail = new userClass.userDetailModel(req.body);

        userDetail.userId = req.params.id;
        userDetail.save().then((result) => {
            if(result){
                callback(null, result);
            }
        }).catch((err) => {callback(err)})
    };

    _self.getUserDetails = (req, res, callback) => {
        console.log('Fetching user details');

        userClass.userDetailModel
        .findOne({where: {userId: req.params.id}})
        .then((result) => {
            if (result) {
                removeSensitiveInfo(result);
                callback(null, result);
            };
        })
        .catch((err) => {
            callback(err);
        })
    }

    return _self;
}();
