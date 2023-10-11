

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
const FriendRoutes = require("./routes/friend")
const TrainingRoutes = require("./routes/entrenamiento")
const RutineRoutes = require("./routes/rutina")
const ExerciseRoutes = require("./routes/ejercicio")
const MuscleRoutes = require("./routes/musculo")


app.use("/api/user", UserRoutes)
app.use("/api/friend", FriendRoutes)
app.use("/api/training", TrainingRoutes)
app.use("/api/rutine", RutineRoutes)
app.use("/api/exercise", ExerciseRoutes)
app.use("/api/muscle", MuscleRoutes)

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