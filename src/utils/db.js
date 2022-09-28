let mysql = require('mysql')

// adding connection to the databas
let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DATABASE
})


connection.connect()

// added test for connection
connection.query ("select now()" ,function(err, rows){
    if (err){
        console.log("Could not establish a connection", err)
    } else {
    console.log("Connection made, test query returned", rows)
}
})

module.exports = connection