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
        default: "https://i.ibb.co/nfq39b4/cutting-board-g299e1b556-1920.jpg",
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