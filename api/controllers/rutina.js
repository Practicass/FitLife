
const Rutine = require("../models/rutineSchema")
const Exercise = require ("../models/exerciseSchema")


const prueba = (req, res) => {
    return res.status(200).send({
        status:"success",
        message: "Enviado desde Rutine"
    })
}

const add = async(req, res) => {
    
    let exercises = req.body.exercises
    
    if(exercises.length == 0 ){
        return res.status(500).send({
            status:"error",
            message: "No se puede guardar una rutina con 0 ejercicios"
        })
    }
    
    let exercisesFound = await Exercise.find({_id: {$in: exercises}})
    
    if(exercisesFound.length != exercises.length){
        return res.status(500).send({
            status:"error",
            message: "Error en al menos un ejercicio"
        })
    }

    let newRutine = new Rutine({name: req.body.name, user: req.user.id, exercises: req.body.exercises })

    let rutineSaved = await newRutine.save()
    if(!rutineSaved){
        return res.status(500).send({
            status:"error",
            message: "No se ha podido guardar la rutina"
        })
    }
    return res.status(200).send({
        status:"success",
        message: "Se ha guardado la rutina correctamente",
        rutineSaved
    })



    

}


const eliminate = (req,res) => {

    let id = req.params.id

    Rutine.findOneAndRemove(id).then(rutineDeleted => {
        if(!rutineDeleted) {
            return res.status(500).json({
                status: "error",
                message: "No se ha podido eliminar la rutina",
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Se ha eliminado correctamente la rutina",
            rutineDeleted
        })
    })
}

const rutines = (req,res) => {

    let me = req.user.id

    Rutine.find({user: me}).then(rutines => {
        return res.status(200).json({
            status: "success",
            message: "Se han mostrado las rutinas correctamente",
            rutines
        })
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "No se han podido mostrar las rutinas",
            error
        })
    })
}


const update = (req, res) => {

    let rutineId = req.params.id

    Rutine.findByIdAndUpdate(rutineId,{name: req.body.name, exercises: req.body.exercises}, {new: true}).then((rutine) => {

        if(!rutine){
            return res.status(500).json({
                status: "error",
                message: "No se ha podido actualizar la rutina"
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Se ha actualizado la rutina correctamente",
            rutine
        })

    }).catch(error => {
        return res.status(500).json({
            status: "error",
            message: "No se ha podido actualizar la rutina",
            error
        })
    })
    



}


module.exports = {
    prueba,
    add,
    eliminate,
    update,
    rutines
}