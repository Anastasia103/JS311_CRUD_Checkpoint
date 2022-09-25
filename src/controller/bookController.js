const db = require('../utils/db')

// shows all the books in the books table
let getAllBooks = function(req, res){
    let sql = "select * from books"
    db.query(sql, function(err, rows){
        if(err)
        {console.log("list todos query failed", err)
        res.sendStatus(500)
        } else{
        // this function changes the table so that the haveRead column shows yes if the value is 0 in that column and no if the value 
        // is 1, this is for the users benefits, does not change the table in the data base    
        let newRows = rows
        for (let i = 0; i < rows.length; i++) {
            if (newRows[i].haveRead == 0){
                newRows[i].haveRead = "no"
        } else {
            newRows[i].haveRead = "yes"
        }
        }   
        res.json(newRows)
        }
    })
}

// this shows one book from table given an id, also shows yes or no for the HaveRead column similar to getAllbooks
let getBook = function(req, res){
    let id = req.params.id
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
                row.haveRead = "no"
            } else {
                row.haveRead = "yes"
            }
            res.json(row)
        }       
    })
}

// updates the book, if the request has name, author, and haveRead in the request body and id in the path
let updateBook = function(req, res) {
    let sql = "UPDATE books SET name = ?, author = ?, haveRead = ? WHERE id = ?"
    // this piece of code makes it so that the user can input no or yes for the haveRead column and this translates the repsonse, and then
    // translates the answere to 0 or 1, so the information can be recorded in the data base in the correct format.
    let translatedhaveRead
    if(req.body.haveRead == "yes"){
        translatedhaveRead = "1"
    } else {
        translatedhaveRead = "0"
    }
    let params = [
        req.body.name,
        req.body.author,
        translatedhaveRead,
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

// adds a book to the table given the name and author in the request body
// note haveRead is always no when it is created
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
            // this function only outputs a 204 message (might change later) if the request goes through
            console.log("Item created", rows)
            res.sendStatus(204)
        }
    })
}

// this function deletes a book given an id
let deleteBook = function(req, res) {
    let sql = "DELETE FROM books WHERE id = ?"
    let params = [
        req.params.id
    ]
    db.query (sql, params, function(err, rows) {
        if (err) {
            console.log("failure to complete request", err)
            res.sendStatus(500)
        } else {
            console.log("Item deleted", rows)
            res.sendStatus(204)
        }
    })   
}
// exporting all the controllers to the bookRoutes file
module.exports = {
    getAllBooks, 
    getBook, 
    deleteBook,
    createBook,
    updateBook
}