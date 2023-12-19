
const Muscle = require("../models/muscleSchema")


//Añade un nuevo músculo a la base de datos
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

//Elimina un usuario de la base de datos
const eliminate = (req, res) => {
    

    let id = req.params.id

     Muscle.findByIdAndRemove(id).then(muscleDeleted => {
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
    }).catch(error => {
        return res.status(500).json({
            status: "error",
            message: "Se ha producido un error al intentar eliminar el musculo",
        })
    })
    
    

}


//Muestra los musculos de la base de datos
const muscles = (req,res) => {
    
    Muscle.find().then(muscles => {
        return res.status(200).json({
            status: "success",
            message: "Se han mostrado correctamente los musculos",
            muscles
        })
    }).catch(error => {
        return res.status(500).json({
            status: "error",
            message: "No se han podido mostrar los musculos",
            error
        })
    })

}



module.exports = {
   
    add,
    eliminate,
    muscles
}