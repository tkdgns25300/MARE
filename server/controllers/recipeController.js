const User = require('../models/User');
const Recipe = require('../models/Recipe');
const verifyToken = require('../utils/verifyToken');
const asyncWrapper = require('../middleware/async');


// 레시피 업로드
const uploadRecipe = asyncWrapper(async (req, res) => {
    const { title, photo, ingredient, contents } = req.body;
    if (title && ingredient && contents) {
        const data = verifyToken(req.headers.authorization.split(' ')[1]);
        const userInfo = await User.findOne({ _id: data.id });
        const { nickname } = userInfo;
        req.body.nickname = nickname;
        await Recipe.create(req.body);
        res.status(201).json({
            message: "success"
        })
    } else { // 제목, 사진, 내용 중 하나라도 요청에 포함되지 않았을 경우
        res.status(400).json({
            message: "fail : require title, ingredient, and contents"
        });
    }
})


// 내가 만든 레시피 모두 조회
const getRecipe = asyncWrapper(async (req, res) => {
    const data = verifyToken(req.headers.authorization.split(' ')[1]);
    const userInfo = await User.findOne({ _id: data.id });
    const { nickname } = userInfo;
    const recipeContents = await Recipe.find({ nickname });
    res.status(200).json({
        data: {
            recipe: recipeContents
        },
        message: "success"
    });
})


// 레시피 1개 조회
const getSingleRecipe = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findOne({ _id: id });
    if (!recipe) { // id가 유효하지 않을 경우
        res.status(400).json({
            data: null,
            message: "fail : invalid recipe's id"
        })
    } else {
        res.status(400).json({
            data: {
                recipe: recipe
            },
            message: "success"
        })
    }
})


// 레시피 삭제
const deleteRecipe = asyncWrapper(async (req, res) => {
    const { id } = req.body;
    if (!id) { // id가 전달되지 않았을 경우
        res.status(400).json({
            message: "fail : require recipe's id"
        })
    } else {
        const recipe = await Recipe.findOne({ _id: id });
        if (!recipe) { // id가 유효하지 않을 경우
            res.status(400).json({
                message: "fail : invalid recipe's id"
            })
        } else {
            await Recipe.deleteOne({ _id: id });
            res.status(200).json({
                message: "success"
            })
        }
    }
})


// 레시피 업데이트
const modifyRecipe = asyncWrapper(async (req, res) => {
    const { id } = req.body;
    if (!id) { // id가 전달되지 않았을 경우
        res.status(400).json({
            message: "fail : require recipe's id"
        })
    } else {
        const recipe = await Recipe.findOne({ _id: id });
        if (!recipe) { // id가 유효하지 않을 경우
            res.status(400).json({
                message: "fail : invalid recipe's id"
            })
        } else {
            await Recipe.updateOne({ _id: id }, req.body, {
                runValidators: true
            })
            res.status(200).json({
                message: "success"
            })
        }
    }
})


// 레시피 즐겨찾기 등록
const bookmarkRecipe = asyncWrapper(async (req, res) => {
    const { id } = req.body;
    if (!id) { // id가 전달되지 않았을 경우
        res.status(400).json({
            message: "fail : require recipe's id"
        })
    } else {
        const recipe = await Recipe.findOne({ _id: id });
        if (!recipe) { // id가 유효하지 않을 경우
            res.status(400).json({
                message: "fail : invalid recipe's id"
            })
        } else {
            const newBookmark = recipe.bookmark === true ? false : true;
            await Recipe.updateOne({ _id: id }, { bookmark: newBookmark }, {
                runValidators: true
            })
            res.status(200).json({
                message: "success"
            })
        }
    }
})



module.exports = {
    uploadRecipe,
    getRecipe,
    getSingleRecipe,
    deleteRecipe,
    modifyRecipe,
    bookmarkRecipe
};