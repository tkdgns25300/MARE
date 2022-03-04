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


// 회원 정보
const getInfo = async (req, res) => {
    try {
        if (!req.headers.authorization) { // token이 전달되지 않았을 경우
            res.status(400).json({
                data: null,
                message: "fail : require token"
            })
        } else {
            const accessToken = req.headers.authorization.split(' ')[1];
            const data = verifyToken(accessToken);
            if (data === 'fail') { // 유효하지 않은 token일 경우
                res.status(400).json({
                    data: null,
                    message: "fail : invalid token"
                })
            } else {
                const userInfo = await User.findOne({ _id: data.id });
                const { _id, nickname, email, createdAt } = userInfo;
                res.status(200).json({
                    data: {
                        userInfo: {
                            _id,
                            nickname,
                            email,
                            createdAt,
                        }
                    },
                    message: "success"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            data: null,
            message: error
        });
    }
}


// 회원정보 업데이트
const updateInfo = async (req, res) => {
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
                if (Object.keys(req.body).length === 0) { // nickname, email 둘 다 request에 없을 경우
                    res.status(400).json({
                        message: "fail : require nickname or email"
                    })
                } else {
                    await User.findOneAndUpdate({ _id: data.id }, req.body, {
                        runValidators: true
                    })
                    res.status(200).json({
                        message: "success"
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


// 패스워드 확인
const checkPassword = async (req, res) => {
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
                const { password } = req.body;
                if (!password) {
                    res.status(400).json({ // password가 전달되지 않았을 경우
                        message: "fail : require password"
                    })
                } else {
                    const userInfo = await User.findOne({ _id: data.id, password: password });
                    if (!userInfo) {
                        res.status(400).json({ // 유효하지 않은 password일 경우
                            message: "fail : invalid password"
                        })
                    } else {
                        res.status(200).json({
                            message: "success : valid password"
                        })
                    }
                }
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
    getInfo,
    updateInfo,
    checkPassword
};

