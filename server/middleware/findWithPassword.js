const bcrypt = require('bcrypt');
const User = require('../models/User')

const findWithPassword = async (clue = {}, password) => {
    const userInfo = await User.findOne(clue);
    if (!userInfo) return false;
    else {
        const encryptedPassword = userInfo.password;
        const isSame = bcrypt.compareSync(password, encryptedPassword);
        return isSame ? userInfo : false;
    }
}

module.exports = findWithPassword;