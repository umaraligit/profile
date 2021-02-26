const expressJwt = require('express-jwt');
const config = require('../../config/config.json');

function jwt() {
    const { secret } = config;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/user/authendicate',
            '/user/create_user'
        ]
    });
}

module.exports = jwt;
