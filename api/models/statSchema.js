
const {Schema, model} = require("mongoose")


const statSchema = Schema({
    // Nombre estadistica
    name: {
        type: String,
        required: true
    },
    // Usuario a la que pertenece la estadistica
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    // Valor
    value: Number,
    // Fecha en la que se recopilo
    date: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = model("Stat", statSchema, "stats")