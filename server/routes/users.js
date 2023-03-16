const express = require("express");
const db = require("../data/db");
const Joi = require("joi");
const { createJwt } = require("../utils/jwtUtils"); 
const router = express.Router();

router.post("/login", async (req, res) => {    
    const user = req.body;

    // validation
    const { error } = validateUser(user);
    if (error) {
        return res.status(400).json({
            code: 400,
            message: error.details[0].message
        });
    }

    // login
    const [loginRows,] = await db.execute("SELECT * FROM users WHERE user_name = ? AND user_password = ?", [user.user_name, user.user_password]);
    if (loginRows[0]) {
        loginRows[0].user_token = createJwt(loginRows[0]);

        res.json({
            code: 200,
            message: "You logged in.",
            data: loginRows[0]
        });
    } else {
        res.json({
            code: 401,
            message: "Username or password is incorrect."
        });
    }
});

router.post("/register", async (req, res) => {
    const user = req.body;
    
    // validation
    const { error } = validateUser(user);
    if (error) {
        return res.status(400).json({
            code: 400,
            message: error.details[0].message
        });
    }

    // register
    try {
        const [process,] = await db.execute("INSERT INTO users (user_name, user_password) VALUES(?, ?)", [user.user_name, user.user_password]);
        if (process.affectedRows > 0) {
            res.status(200).json({
                code: 200,
                message: "You registered successfully."
            });
        } else {
            res.status(500).json({
                code: 500,
                message: "Something went wrong."
            });
        }
    } catch(e) {
        res.status(400).json({
            code: 400,
            message: "This username is already taken."
        });
    }
});

function validateUser(user) {
    const schema = new Joi.object({
        user_name: Joi.string().min(3).max(20).required(),
        user_password: Joi.string().min(3).max(20).required()
    });

    return schema.validate(user);
}

module.exports = router;