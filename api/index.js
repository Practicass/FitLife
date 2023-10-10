

const connection = require("./database/connection")
const express = require("express")
const cors = require("cors")

console.log("API NODE para FITLIFE arrancada")

connection.connection()

const app = express()
const puerto = 3900

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const UserRoutes = require("./routes/usuario")

app.use("/api/user", UserRoutes)



app.listen(puerto, () => {
    console.log("Servidor de node corriendo en el puerto: ", puerto)
}) 