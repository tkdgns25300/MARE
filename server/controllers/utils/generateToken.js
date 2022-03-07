const jwt = require('jsonwebtoken');

const generateToken = (userInfo) => {
    return jwt.sign({
        id: userInfo._id
    }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
}

module.exports = generateToken;