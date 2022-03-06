const User = require('../models/User');
const Recipe = require('../models/Recipe');
const verifyToken = require('./utils/verifyToken');

// 레시피 업로드
const uploadRecipe = async (req, res) => {
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
                const { title, photo, ingredient, contents } = req.body;
                if (title && ingredient && contents) {
                    const userInfo = await User.findOne({ _id: data.id });
                    const { nickname } = userInfo;
                    req.body.nickname = nickname;
                    await Recipe.create(req.body);
                    res.status(200).json({
                        message: "success"
                    })
                } else { // 제목, 사진, 내용 중 하나라도 요청에 포함되지 않았을 경우
                    res.status(400).json({
                        message: "fail : require title, ingredient, and contents"
                    });
                }
            }
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    uploadRecipe,
};