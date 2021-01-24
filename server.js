const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/global.css", (req, res) => {
    res.sendFile(__dirname + "/public/global.css")
})

app.get("/:anyPath", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/build/:file', (req, res) => {
    res.sendFile(__dirname + "/public/build/" + req.params.file)
})

app.listen(5200, () => {
  console.log(`Example app listening at http://localhost:5200`)
})