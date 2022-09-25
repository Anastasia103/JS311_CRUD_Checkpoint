let express = require("express")

let PORT = 8080

let app = express()

app.use(express.json())

app.listen(PORT, function() {
    console.log("Application listening on port", PORT)
})

let bookRoutes = require("./routes/bookRoutes")

app.use(bookRoutes)
