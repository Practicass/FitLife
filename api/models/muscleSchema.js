
const {Schema, model} = require("mongoose")


const muscleSchema = Schema({
    // Nombre del músculo
    name: {
        type: String,
        required: true
    }
    
})

module.exports = model("Muscle", muscleSchema, "muscles")