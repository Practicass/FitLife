
const {Schema, model} = require("mongoose")


const rutineSchema = Schema({
    // Nombre de la rutina
    name: {
        type: String,
        required: true
    },
    // Usuario que hace la rutina
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    // Lista de ejercicios que realiza la rutina
    exercises: [{
        type: Schema.ObjectId,
        ref: "Exercise"
    }]

    
})

module.exports = model("Rutine", rutineSchema, "exercises")