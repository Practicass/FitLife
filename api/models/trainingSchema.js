
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
    //si va a poder ser vista por sus amigos
    public:{
        type: Boolean,
        required: true
    } ,
    duration:{
        type: Number,
        required: true
    } ,
    // fecha creacion
    created_at: {
        type: Date,
        default: Date.now
    },
    routine:{
        type: Schema.ObjectId,
        ref: "Rutine"
        
    }
})

module.exports = model("Training", trainingSchema, "trainings")