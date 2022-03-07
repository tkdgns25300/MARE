const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        trim: true,
        unique: [true, 'the nickname already exist'],
        required: [true, 'must provide nickname'],
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'the email already exist'],
        required: [true, 'must provide email'],
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'must provide password'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('User', UserSchema);