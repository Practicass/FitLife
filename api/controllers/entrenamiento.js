
const Training = require("../models/trainingSchema")
const Exercise = require("../models/exerciseSchema")


const prueba = (req, res) => {
    return res.status(200).send({
        status:"success",
        message: "Enviado desde Training"
    })
}

const add = async(req, res) => {
    
    let sets = req.body.sets
    
    if(sets.length == 0 ){
        return res.status(500).send({
            status:"error",
            message: "No se puede guardar una rutina con 0 ejercicios"
        })
    }
    let exercisesIds = sets.map(set => set.exercise)
    let exercisesFound = await Exercise.find({_id: {$in: exercisesIds}})
    
    if(exercisesFound.length != sets.length){
        return res.status(500).send({
            status:"error",
            message: "Error en al menos un ejercicio"
        })
    }

    let newTraining = new Training({name: req.body.name, user: req.user.id, sets: req.body.sets})

    let trainingSaved = await newTraining.save()
    if(!trainingSaved){
        return res.status(500).send({
            status:"error",
            message: "No se ha podido guardar el entrenamiento"
        })
    }
    return res.status(200).send({
        status:"success",
        message: "Se ha guardado el entrenamiento correctamente",
        trainingSaved
    })



    

}



module.exports = {
    prueba,
    add
}