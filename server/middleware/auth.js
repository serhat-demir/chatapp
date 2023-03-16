const { verifyJwt } = require("../utils/jwtUtils");

module.exports = function auth(req, res, next) {
    const token = req.header("X-Auth-Token");
    const tokenDecoded = verifyJwt(token);

    if (tokenDecoded.isValid) {
        next();
    } else {
        res.status(401).json({
            code: 401,
            message: tokenDecoded.message
        });
    }
}