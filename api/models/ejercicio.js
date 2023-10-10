
const {Schema, model} = require("mongoose")


const exerciseSchema = Schema({

    name: {
        type: String,
        required: true
    },
    description: String,
    muscle: {
        type: Schema.ObjectId,
        ref: "Muscle"
    }

    
})

module.exports = model("Exercise", exerciseSchema, "exercises")