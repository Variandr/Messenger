module.exports = (res, error) => {
    res.status(500).json({
        code: 1,
        message: error.message ? error.message : error
    })
}