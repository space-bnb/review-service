module.exports = (req, _res, next) => {
    req.body.author_id = req.headers['author_id'];
    next();
};
