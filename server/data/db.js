const mysql = require("mysql2");
const config = require("../config");

let connection = mysql.createConnection(config.db);
connection.connect((error) => {
    if (error)
        log.e(error);

    console.log("mysql connected");
});

module.exports = connection.promise();