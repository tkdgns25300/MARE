const User = require('../models/User');

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

module.exports = {
    signup
};
