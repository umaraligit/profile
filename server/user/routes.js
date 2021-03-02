var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();

const response = require('../utils/response');
var controller = require('./controller');

handle_response = (err, res, data) => {
    err ? response.send_error_json(res, err) : response.send_response_json(res, data);
};

router
.get('/get_details/:id', function (req, res){
    controller.getUserDetails(req, res, (err, data) => {
        handle_response(err, res, data);
    });
});

router
.post('/authendicate', upload.none(), function (req, res){
    controller.authendicate(req, res, (err, data) => {
        handle_response(err, res, data);
    });
});

router
.post('/create_user', upload.none(), function (req, res) {
    controller.createUser(req, res, (err, data) => {
        handle_response(err, res, data);
    });
});

router
.post('/:id/create_user_details', upload.single('avatar'), function (req, res) {
    controller.createUserdetails(req, res, (err, data) => {
        handle_response(err, res, data);
    });
});

module.exports = router;
