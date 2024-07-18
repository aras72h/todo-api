const { body, validationResult } = require('express-validator');

const validateUserProfileUpdate = () => {
    return [
        body('username', 'Username is required').notEmpty(),
        body('email', 'Invalid email').isEmail(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ];
};

module.exports = {
    validateUserProfileUpdate,
};
