const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);    
        return data;
    } catch (error) {
        return 'fail';
    }
}

module.exports = verifyToken;