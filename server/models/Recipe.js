const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: [true, 'must provide nickname'],
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'must provide title'],
    },
    photo: {
        type: String,
        // default: "추후 프론트에서 주신 default URL 업로드"
    },
    ingredient: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'must provide ingredient'],
    },
    contents: {
        type: String,
        trim: true,
        required: [true, 'must provide contents'],
    },
    bookmark: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Recipe', RecipeSchema);