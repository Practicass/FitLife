


const Exercise = require("../models/exerciseSchema")


const prueba = (req, res) => {
    return res.status(200).send({
        status:"success",
        message: "Enviado desde Exercise"
    })
}

const add = (req, res) => {
    

    if(!req.body.nombre){
        return res.status(500).send({
            status:"error",
            message: "Faltan datos por enviar"
        })
    }



    

}



module.exports = {
    prueba
}