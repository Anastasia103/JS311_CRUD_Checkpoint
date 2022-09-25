let express = require("express")

let router = express.Router()
let controller = require('../controller/bookController')

router.get("books", controller.getAllBooks)
router.get("books/:id", controller.getBook)

router.delete("books/:id", controller.deleteBook)
router.put("books/:id", controller.updateBook)
router.post("books/", controller.createBook)