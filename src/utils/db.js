let mysql = require('mysql')

let connection = mysql.createConnection({
    host: "database-2.cfekt2njspgn.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Target!72", 
    database: "hello"
})


connection.connect()

module.exports = connection