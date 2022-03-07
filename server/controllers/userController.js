const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const verifyToken = require('../utils/verifyToken');
const asyncWrapper = require('../middleware/async');


// 회원 가입
const signup = asyncWrapper(async (req, res) => {
    const { email, password, nickname } = req.body;
    if (email && password && nickname) {
        await User.create(req.body);
        res.status(201).json({ message: "success" });
    } else {
        res.status(400).json({ message: "fail : require email, password, and nickname" });
    }
})


// 회원 탈퇴
const signout = asyncWrapper(async (req, res) => {
    const data = verifyToken(req.headers.authorization.split(' ')[1]);
    await User.findOneAndDelete({ _id: data.id });
    res.status(200).json({
        message: "success"
    })
    // redirect to homepage
})


// 로그인
const login = asyncWrapper(async (req, res) => {
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
})


// 로그아웃
const logout = asyncWrapper(async (req, res) => {
    res.json({
        message: "success"
    });
    // redirect to homepage
})


// 회원 정보
const getData = asyncWrapper(async (req, res) => {
    const data = verifyToken(req.headers.authorization.split(' ')[1]);
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
})


// 회원정보 업데이트
const updateData = asyncWrapper(async (req, res) => {
    if (Object.keys(req.body).length === 0) { // nickname, password 둘 다 request에 없을 경우
        res.status(400).json({
            message: "fail : require nickname or password"
        })
    } else {
        const data = verifyToken(req.headers.authorization.split(' ')[1]);
        await User.findOneAndUpdate({ _id: data.id }, req.body, {
            runValidators: true
        })
        res.status(200).json({
            message: "success"
        })
    }
})


// 패스워드 확인
const checkPassword = asyncWrapper(async (req, res) => {
    const { password } = req.body;
    if (!password) {
        res.status(400).json({ // password가 전달되지 않았을 경우
            message: "fail : require password"
        })
    } else {
        const data = verifyToken(req.headers.authorization.split(' ')[1]);
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
})


// 닉네임 확인
const checkNickname = asyncWrapper(async (req, res) => {
    const { nickname } = req.body;
    if (!nickname) {
        res.status(400).json({ // nickname이 전달되지 않았을 경우
            message: "fail : require nickname"
        })
    } else {
        const userInfo = await User.findOne({ nickname });
        if (userInfo) {
            res.status(400).json({ // nickname이 중복되는 경우
                message: "fail : invalid nickname"
            })
        } else {
            res.status(200).json({
                message: "success : valid nickname"
            })
        }
    }
})


// 이메일 확인
const checkEmail = asyncWrapper(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ // email이 전달되지 않았을 경우
            message: "fail : require email"
        })
    } else {
        const userInfo = await User.findOne({ email });
        if (userInfo) {
            res.status(400).json({ // email이 중복되는 경우
                message: "fail : invalid email"
            })
        } else {
            res.status(200).json({
                message: "success : valid email"
            })
        }
    }
})


module.exports = {
    signup,
    signout,
    login,
    logout,
    getData,
    updateData,
    checkPassword,
    checkNickname,
    checkEmail,
};