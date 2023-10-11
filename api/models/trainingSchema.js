
const {Schema, model} = require("mongoose")


const trainingSchema = Schema({
    // nombre del entrenamiento, por defecto "Entrenamiento"
    // Si se sigue una rutina su nombre sera el d
    name: {
        type: String,
        default: "Entrenamiento"
    },

    //usurario que la  realaliza
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    //series
    sets: [{
        exercise:{
            type: Schema.ObjectId,
            ref: "Exercise"
        },
        weight: Number,
        reps: Number
    }],
    // fecha creacion
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("Training", trainingSchema, "trainings")