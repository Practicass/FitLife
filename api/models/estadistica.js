
const {Schema, model} = require("mongoose")


const statsSchema = Schema({

    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    value: Number,
    date: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = model("Stat", statsSchema, "stats")