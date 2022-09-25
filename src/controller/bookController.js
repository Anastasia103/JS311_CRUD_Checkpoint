const db = require('../utils/db')

let getAllBooks = function(req, res){
    let sql = "select * from books"
    db.query(sql, function(err, rows){
        if(err)
        {console.log("list todos query failed", err)
        res.sendStatus(500)
        } else{
        res.json(rows)
        }
    })
}

let getBook = function(req, res){
    let id = request.params.id
    if(!id){
        res.sendStatus(400)
        return
    }
     
    let sql =" select * from books where id = ?"
    let params = [id]
    db.query (sql, params, function(err, rows){
        if(err){
            console.log("failed to get an item from the db", err)
            res.sendStatus(500)
        } else if (rows.length > 1){
            console.log("returned more than 1 row for id", id)
            res.sendStatus(500)
        } else if (rows.length == 0) {
            res.json(null)
        } else {
            let row = rows[0]
            if (row.haveRead == 0){
                row.done = "yes"
            } else {
                row.done = "no"
            }
            res.json(row)
        }       
    })
}

let updateBook = function(req, res) {
    let sql = "UPDATE book SET name = ?, author = ?, haveRead = ? WHERE id = ?"
    let params = [
        req.body.name,
        req.body.author,
        req.body.haveRead,
        req.params.id
    ]
    db.query (sql, params, function(err, rows){
        if (err){
            console.log("failure to complete request", err)
            res.sendStatus(500)
        } else {
            console.log("Item updated", rows)
            res.json(rows)
        }
    })
}

let createBook = function(req, res) {
    let sql = "INSERT INTO books (name, author, haveRead) values (?, ?, ?)"
    let params = [
        req.body.name,
        req.body.author,
        0
    ]
    db.query(sql, params, function(err, rows){
        if (err){
         console.log("failure to complete request", err)
         res.sendStatus(500)   
        } else {
            console.log("Item created", rows)
            res.sendStatus(204)
        }
    })
}

let deleteBook = function(req, res) {
    let sql = "DELETE books where id = ?"
    let params = [
        request.params.id
    ]
    db.query (sql, params, function(err, rows) {
        if (err) {
            console.log("failure to complete request", err)
            res.sendStatus(500)
        } else {
            console.log("Item deleted", rows)
            res.json(rows.affectedRows)
        }
    })   
}

module.exports = {
    getAllBooks, 
    getBook, 
    deleteBook,
    createBook,
    updateBook
}