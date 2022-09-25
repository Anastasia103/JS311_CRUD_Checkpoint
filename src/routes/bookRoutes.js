let express = require("express")

let router = express.Router()
let controller = require('../controller/bookController')


// my Routes, see bookcontrollers for details on specifics
router.get("/books", controller.getAllBooks)
router.get("/books/:id", controller.getBook)

router.delete("/books/:id", controller.deleteBook)
router.put("/books/:id", controller.updateBook)
router.post("/books", controller.createBook)

module.exports = router