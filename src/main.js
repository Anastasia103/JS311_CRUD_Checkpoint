let express = require("express")

let PORT = 8080

let app = express()

app.use(express.json())

let bookRoutes = require("./routes/bookRoutes")
app.use(bookRoutes)

app.listen(PORT, function() {
    console.log("Application listening on port", PORT)
})