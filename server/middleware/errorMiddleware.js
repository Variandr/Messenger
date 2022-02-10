const errorHandler = require('../helpers/errorHandler')
module.exports = (err, req, res, next) => {
    console.log(err)
    if (err instanceof errorHandler) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: "Unknown server error"})
}