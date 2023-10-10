
const {Schema, model} = require("mongoose")


const muscleSchema = Schema({

    name: {
        type: String,
        required: true
    }
    
})

module.exports = model("Muscle", muscleSchemaSchema, "muscles")