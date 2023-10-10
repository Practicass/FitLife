
const {Schema, model} = require("mongoose")


const trainingSchema = Schema({

    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    exercises: [{
        exercise:{
            type: Schema.ObjectId,
            ref: "Exercise"
        },
        weight: Number
        
    }]

    
})

module.exports = model("Training", trainingSchema, "trainings")