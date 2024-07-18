// middleware/errorMiddleware.js
const handleErrors = (err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};

module.exports = {
    handleErrors,
};
