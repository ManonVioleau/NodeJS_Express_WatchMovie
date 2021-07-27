var mysql = require('mysql');

module.exports = mysql.createConnection({
    host: "localhost",
    user: "manondbb",
    password: "m",
    database: "movies"
});