
const {Schema, model} = require("mongoose")


const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "default.png"
    },
    weight: Number,
    height: Number,
    age: Number,
    sex: String, 
    created_at: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = model("User", userSchema, "users")