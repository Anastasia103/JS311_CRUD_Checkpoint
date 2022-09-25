let mysql = require('mysql')

// adding connection to the databas
let connection = mysql.createConnection({
    host: "database-2.cfekt2njspgn.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Target!72", 
    database: "hello"
})


connection.connect()

module.exports = connection