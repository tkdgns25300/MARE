const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(); // salt 생성
    this.password = await bcrypt.hash(this.password, salt); // 비밀번호 해싱
    next();
  });


module.exports = mongoose.model('User', UserSchema);