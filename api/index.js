

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
const FollowRoutes = require("./routes/follow")

app.use("/api/user", UserRoutes)

app.get("/ruta-prueba", (req, res) => {
    return res.status(200).json(
        {
            "id": 1,
            "nombre": "Pablo",
            "correo": "pabloangusto@gmail.com"
        }
    )
})

app.listen(puerto, () => {
    console.log("Servidor de node corriendo en el puerto: ", puerto)
}) 