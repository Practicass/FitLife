
const {Schema, model} = require("mongoose")


const exerciseSchema = Schema({
    // Nombre del ejercicio
    name: {
        type: String,
        required: true
    },
    // Descripcion del ejercicio
    description: String,
    // Musculo que trabaja
    muscle: {
        type: Schema.ObjectId,
        ref: "Muscle"
    }

    
})

module.exports = model("Exercise", exerciseSchema, "exercises")