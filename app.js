const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cocktailRoutes = require("./routes/cocktailRoutes")

const app = express()
const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", cocktailRoutes)

app.get("/", (req, res) => {
  res.redirect("/cocktails")
})

app.use((req, res) => {
  res.status(404).render("404", { title: "Strona nie znaleziona" })
})

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`)
  console.log(`Otwórz http://localhost:${PORT} w przeglądarce`)
})
