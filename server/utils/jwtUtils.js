const jwt = require("jsonwebtoken");
const config = require("../config");

function createJwt(user) {
    return jwt.sign({
        _id: user.user_id,
        _name: user.user_name
    }, config.jwtKey, {
        expiresIn: '2h'
    });
}

function verifyJwt(token) {
    var res = {};

    jwt.verify(token, config.jwtKey, function(err, decoded) {
        if (err) {
            res = {
                isValid: false,
                message: err.message
            };
        } else {
            res = {
                isValid: true,
                data: decoded
            }; 
        }
    });

    return res;
}

module.exports = { createJwt, verifyJwt };