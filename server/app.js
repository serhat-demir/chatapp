const http = require("http");
const express = require("express");
const db = require("./data/db");
const { verifyJwt } = require("./utils/jwtUtils");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/users");
const mainRoutes = require("./routes/main");

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));

app.use(messageRoutes);
app.use(userRoutes);
app.use(mainRoutes);

io.on('connection', (socket) => {
    console.log("a user connected");

    socket.on('message', (data) => { // data: message, token(payload: _id, _name)
        const tokenDecoded = verifyJwt(data.token);

        if (tokenDecoded.isValid) {
            if (newMessage(data.message, tokenDecoded.data._id)) {            
                io.emit('message', {
                    message: data.message,
                    sender: tokenDecoded.data._name
                });
            }
        } else {
            socket.emit('error', {
                message: tokenDecoded.message
            });
        }
    });

    socket.on('disconnect', () => {
        console.log("user disconnected");
    });
});

async function newMessage(message, sender_id) {
    const [process,] = await db.execute("INSERT INTO messages (message_text, message_sender) VALUES(?, ?)", [message.trim(), sender_id]);
    return process.affectedRows > 0;
}

server.listen(3000, () => console.log("listening on port 3000"));