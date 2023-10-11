
const Muscle = require("../models/muscleSchema")


const prueba = (req, res) => {
    return res.status(200).send({
        status:"success",
        message: "Enviado desde Muscle"
    })
}

const add = async(req, res) => {
    

    let name = req.body.name

    if(!name){
        return res.status(500).send({
            status:"error",
            message: "Faltan datos por enviar"
        })
    }

    let aux = await Muscle.find({name})
    if(aux.length != 0){
        return res.status(500).send({
            status:"error",
            message: "Ya existe ese musculo"
        })
    }

    let newMuscle = new Muscle({name})

    let muscleStored = await newMuscle.save()
    if(!muscleStored) return res.status(500).send({status: "error", message: "Error al guardar el musculo"})
    if(muscleStored){
        return res.status(200).json({
            status: "success",
            message: "Musculo registrado correctamente",
            newMuscle
        })
    }



    

}

const eliminate = async(req, res) => {
    

    let name = req.body.name

    if(!name){
        return res.status(500).send({
            status:"error",
            message: "Faltan datos por enviar"
        })
    }

    await Muscle.find({name}).remove().then(muscleDeleted => {
        if(!muscleDeleted) {
            return res.status(500).json({
                status: "error",
                message: "No se ha podido eliminar el musculo",
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Se ha eliminado correctamente el musculo",
            muscleDeleted
        })
    })
    
    



    

}



module.exports = {
    prueba,
    add,
    eliminate
}