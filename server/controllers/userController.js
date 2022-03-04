const User = require('../models/User');
const generateToken = require('./utils/generateToken');

const signup = async (req, res) => {
    try {
        const { email, password, nickname } = req.body;
        if (email && password && nickname) {
            await User.create(req.body);
            res.status(201).json({ message: "success" });
        } else {
            res.status(400).json({ message: "fail : require email, password, and nickname" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const userInfo = await User.findOne({ email, password });
            if (!userInfo) { // 해당 User가 없는 경우
                res.status(400).json({ message: "fail : there is no user with that email and password" })
            } else {
                const accessToken = generateToken(userInfo);
                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24,
                    // domain :
                })
                res.status(200).json({ message: "success" });
            }
        } else { // email과 password가 둘 중 하나라도 요청에 있지 않은 경우
            res.status(400).json({ message: "fail : require email and password" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    signup,
    login
};
