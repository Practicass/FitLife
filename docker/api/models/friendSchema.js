
const {Schema, model} = require("mongoose")


const friendSchema = Schema({

    // Usuario
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    // Usuario amigo
    friend: {
        type: Schema.ObjectId,
        ref: "User"
    },
    // Cuando empezaron a seguirse
    created_at: {
        type: Date,
        default: Date.now
    },
    confirmed: {
        type: Boolean,
        default: false
    }

    
})

module.exports = model("Friend", friendSchema, "friends")