const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const userClass  = require('./models');
const { secret } = require('../../config/config.json');

function removeSensitiveInfo(data) {
    if (data.dataValues){
        if (data.dataValues.password) delete data.dataValues.password;
    }
};

module.exports = function() {
    const _self = {};

    _self.createUser = (req, res, callback) => {
        console.log('Creating user');

        var data = req.body.data || req.body;
        let user = new userClass.userModel(data);
        bcrypt.hash(data.password, 12, (err, hash) => {
            if (err) callback(err);
            user.password = hash
            user.save()
            .then((result) => {
                if(!_.isEmpty(result)) {
                    removeSensitiveInfo(result);
                    callback(null, result);
                } else { callback('Cannot create new record') }
            })
            .catch((err) => {callback(err)})
        });
    };

    _self.authendicate = (req, res, callback) => {
        console.log('Validating User');

        params = req.body.data || req.body;

        userClass.userModel
        .findOne({
            where: {
                [Op.or]:[{username: params.username}, {email: params.username}]
            }
        })
        .then((result) => {
            if(!_.isEmpty(result)) {
                bcrypt.compare(params.password, result.password, (err, validPassword) => {
                    console.log(validPassword)
                    if (validPassword) {
                        result.dataValues.token = jwt.sign({ sub: result.id }, secret, { expiresIn: '3h' });
                        removeSensitiveInfo(result);
                        callback(null, result);
                    } else { callback('Password Missmatched') }
                });
            } else {
                callback('Username or password mismatched!');
            }
        })
        .catch((err) => {
            callback(err)
        })
    };

    _self.createUserdetails = (req, res, callback) => {
        console.log('Creating user details');

        data = req.body.data || req.body;

        const userDetail = new userClass.userDetailModel(data);

        userDetail.userId = req.params.id;
        userDetail.imageType = req.file.mimetype;
        userDetail.imageName = req.file.originalname;
        userDetail.imageData = req.file.buffer;
        userDetail.save().then((result) => {
            if(!_.isEmpty(result)){
                const image = result.imageData.toString('base64');
                result['imageData'] = image
                callback(null, result);
            } else { callback('Cannot create new record') }
        }).catch((err) => {callback(err)})
    };

    _self.getUserDetails = (req, res, callback) => {
        console.log('Fetching user details');

        userClass.userDetailModel
        .findOne({where: {userId: req.params.id}})
        .then((result) => {
            if(!_.isEmpty(result)) {
                const image = result.imageData.toString('base64');
                result['imageData'] = image
                removeSensitiveInfo(result);
                callback(null, result);
            } else { callback('Result Not Found') }
        })
        .catch((err) => {
            callback(err);
        })
    }

    return _self;
}();
