function errorHandler(err, req, res, next) {

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ status:'Error', message: 'Invalid Token' });
    }
}

module.exports = errorHandler;
