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
                    res.status(201).json({
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


// 내가 만든 레시피 조회
const getRecipe = async (req, res) => {
    try {
        if (!req.headers.authorization) { // token이 전달되지 않았을 경우
            res.status(401).json({
                data: null,
                message: "fail : require token"
            })
        } else {
            const accessToken = req.headers.authorization.split(' ')[1];
            const data = verifyToken(accessToken);
            if (data === 'fail') { // 유효하지 않은 token일 경우
                res.status(401).json({
                    data: null,
                    message: "fail : invalid token"
                })
            } else {
                const userInfo = await User.findOne({ _id: data.id });
                const { nickname } = userInfo;
                const recipeContents = await Recipe.find({ nickname });
                res.status(200).json({
                    data: {
                        recipe: recipeContents
                    },
                    message: "success"
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            data: null,
            message: error
        });
    }
}


// 레시피 삭제
const deleteRecipe = async (req, res) => {
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
                const { id } = req.body;
                if (!id) { // id가 전달되지 않았을 경우
                    res.status(400).json({
                        message: "fail : require recipe's id"
                    })
                } else {
                    const recipe = await Recipe.findOne({ _id : id });
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
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}


// 레시피 업데이트
const modifyRecipe = async (req, res) => {
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
                const { id } = req.body;
                if (!id) { // id가 전달되지 않았을 경우
                    res.status(400).json({
                        message: "fail : require recipe's id"
                    })
                } else {
                    const recipe = await Recipe.findOne({ _id : id });
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
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}


// 레시피 즐겨찾기 등록
const bookmarkRecipe = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) { // id가 전달되지 않았을 경우
            res.status(400).json({
                message: "fail : require recipe's id"
            })
        } else {
            const recipe = await Recipe.findOne({ _id : id });
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
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}



module.exports = {
    uploadRecipe,
    getRecipe,
    deleteRecipe,
    modifyRecipe,
    bookmarkRecipe
};