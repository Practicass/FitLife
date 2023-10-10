
const mongoose = require("mongoose")

const connection = async() => {

    try{
        await mongoose.connect("mongodb+srv://sisInfo:eUNxrfZiiPuFZXJS@fitlife.nnl10ji.mongodb.net/sisInfo")


        console.log("Conectado correctamente a bd: fitLife")

    }catch(error){
        console.log(error)
        throw new Error("No se ha podido conectar a la base de datos")
    }
}

module.exports = {
    connection
}