
const Rutine = require("../models/rutineSchema")
const Exercise = require ("../models/exerciseSchema")



//Añade una nueva rutina a la base de datos
const add = async(req, res) => {
    
    let exercises = req.body.exercises
    if(!req.body.name){
        return res.status(500).send({
            status:"error",
            message: "Faltan datos"
        })
    }
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

//Elimina una rutina de la base de datos
const eliminate = (req,res) => {

    let id = req.params.id

    Rutine.findOneAndRemove({_id:id, user: req.user.id}).then(rutineDeleted => {
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


//Muesta todas las rutinas de un usuario y las del administrador
const rutines = (req,res) => {

    let me = req.user.id

    Rutine.find({$or: [{user: me},{rol: "admin" }]}).populate("exercises user").then(rutines => {
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

//Actualiza una rutina de la base de datos
const update = (req, res) => {

    let rutineId = req.params.id

    Rutine.findByIdAndUpdate(rutineId,{user: req.user.id, name: req.body.name, exercises: req.body.exercises}, {new: true}).then((rutine) => {

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

const routine = (req,res) => {
    let rutineId = req.params.id

    Rutine.findById(rutineId).populate('exercises').then(rutine => {
        return res.status(200).json({
            status: "success",
            message: "Se ha mostrado la rutina correctamente",
            rutine
        })
    }).catch(error => {
        return res.status(500).json({
            status: "error",
            message: "No se ha podido mostrar la rutina",
            error
        })
    })
}


module.exports = {
   
    add,
    eliminate,
    update,
    rutines,
    routine
}