
const Training = require("../models/trainingSchema")


const prueba = (req, res) => {
    return res.status(200).send({
        status:"success",
        message: "Enviado desde Training"
    })
}

const add = (req, res) => {
    
}



module.exports = {
    prueba
}