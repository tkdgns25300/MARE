const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            res.status(500).json({
                message: "Somgthing went wrong, please try again"
            });
        }
    }
}

module.exports = asyncWrapper;