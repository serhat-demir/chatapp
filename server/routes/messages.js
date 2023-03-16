const express = require("express");
const db = require("../data/db");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/messages", auth, async (req, res) => {
    const [messages,] = await db.execute("SELECT messages.message_text, users.user_name as message_sender FROM messages INNER JOIN users ON messages.message_sender = users.user_id ORDER BY messages.message_id ASC");
    res.status(200).json({
        code: 200,
        message: "OK",
        data: messages
    })
});

module.exports = router;