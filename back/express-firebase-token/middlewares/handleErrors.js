function notFound(req, res, next) {
    res.status(404)
    res.json({message: '🛠 Not Found'})
}

module.exports = {notFound}