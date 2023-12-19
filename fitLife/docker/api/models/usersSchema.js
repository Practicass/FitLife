
const {Schema, model} = require("mongoose")


const userSchema = Schema({
    // Nombre
    name: {
        type: String,
        required: true
    },
    // Apellidos
    surname: {
        type: String,
        required: true
    },
    // Nombre Usuario
    nick: {
        type: String,
        required: true,
        unique: true
    },
    // correo electronico
    email: {
        type: String,
        required: true,
        unique:true
    },
    // Contraseña cuenta
    password: {
        type: String,
        required: true
    },
    // foto perfil
    image: {
        type: String,
        default: "default.png"
    },
    // Fecha nacimiento
    birth: Date,
    // Sexo
    sex: String, 
    // Fecha creacion cuenta
    created_at: {
        type: Date,
        default: Date.now
    },
    // Usuario o admin
    rol: {
        type: String,
        default: "usuario"
    }
    
})

module.exports = model("User", userSchema, "users")