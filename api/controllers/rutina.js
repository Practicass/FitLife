
const Rutine = require("../models/rutineSchema")


const prueba = (req, res) => {
    return res.status(200).send({
        status:"success",
        message: "Enviado desde Rutine"
    })
}

const add = (req, res) => {
    

    

}



module.exports = {
    prueba
}