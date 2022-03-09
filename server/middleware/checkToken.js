const verifyToken = require('../utils/verifyToken');

const checkToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) { // token이 전달되지 않았을 경우
            res.status(401).json({
                message: "fail : require token"
            })
        } else {
            const accessToken = req.headers.authorization.split(' ')[1];
            const data = verifyToken(accessToken);
            if (data === 'fail') { // 유효하지 않은 token일 경우
                res.status(401).json({
                    message: "fail : invalid token"
                })
            } else {
                next();
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = checkToken;