const User = require('../models/User');
const generateToken = require('./utils/generateToken');
const verifyToken = require('./utils/verifyToken');


// 회원 가입
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


// 회원 탈퇴
const signout = async (req, res) => {
    try {
        if (!req.headers.authorization) { // token이 전달되지 않았을 경우
            res.status(400).json({
                message: "fail : require token"
            })
        } else {
            const accessToken = req.headers.authorization.split(' ')[1];
            const data = verifyToken(accessToken);
            if (data === 'fail') { // 유효하지 않은 token일 경우
                res.status(400).json({
                    message: "fail : invalid token"
                })
            } else {
                await User.findOneAndDelete({ _id: data.id });
                res.status(200).json({
                    message: "success"
                })
                // redirect to homepage
            }
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


// 로그인
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const userInfo = await User.findOne({ email, password });
            if (!userInfo) { // 해당 User가 없는 경우
                res.status(400).json({
                    data: null,
                    message: "fail : there is no user with that email and password"
                })
            } else {
                const accessToken = generateToken(userInfo);
                res.status(200).json({
                    data: {
                        accessToken: accessToken,
                    },
                    message: "success"
                })
            }
        } else { // email과 password가 둘 중 하나라도 요청에 있지 않은 경우
            res.status(400).json({
                data: null,
                message: "fail : require email and password"
            });
        }
    } catch (error) {
        res.status(500).json({
            data: null,
            message: error
        });
    }
}


// 로그아웃
const logout = async (req, res) => {
    try {
        if (!req.headers.authorization) { // token이 전달되지 않았을 경우
            res.status(400).json({
                message: "fail : require token"
            })
        } else {
            const accessToken = req.headers.authorization.split(' ')[1];
            const data = verifyToken(accessToken);
            if (data === 'fail') { // 유효하지 않은 token일 경우
                res.status(400).json({
                    message: "fail : invalid token"
                })
            } else {
                res.json({
                    message: "success"
                });
                // redirect to homepage
            }
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    signup,
    signout,
    login,
    logout,
};
