
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
    console.log(exercisesFound)
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
        message: "Se ha guardado la rutina correctamente"
    })



    

}


const eliminate = (req,res) => {

    let id = req.params.id

    Rutine.find(id).remove().then(rutineDeleted => {
        if(!rutineDeleted) {
            return res.status(500).json({
                status: "error",
                message: "No se ha podido eliminar el ejercicio",
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Se ha eliminado correctamente el ejercicio",
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


module.exports = {
    prueba,
    add,
    eliminate,
    rutines
}