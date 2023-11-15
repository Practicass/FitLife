


const Exercise = require("../models/exerciseSchema")
const Muscle = require("../models/muscleSchema")




//Añade a la base datos un nuevo ejercicio
const add = async (req, res) => {
    

    if(!req.body.name || !req.body.muscle){
        return res.status(500).send({
            status:"error",
            message: "Faltan datos por enviar"
        })
    }

    let muscle = await Muscle.findById(req.body.muscle)

    if(muscle.length == 0){
        return res.status(500).send({
            status:"error",
            message: "Los datos enviados son erróneos"
        })
    }

    let exercise = await Exercise.find({name: req.body.name , muscle: req.body.muscle})

    if(exercise.length != 0){
        return res.status(500).send({
            status:"error",
            message: "Ya existe el ejercicio"
        })
    }

    let newExercise = new Exercise({name: req.body.name, description: req.body.description, muscle: req.body.muscle})
    
    let exerciseStored = await newExercise.save()

    if(!exerciseStored){
        return res.status(500).send({
            status:"error",
            message: "No se ha podido guardar el ejercicio"
        })
    }
    return res.status(200).send({
        status:"success",
        message: "Se ha guardado el ejercicio correctamente"
    })



    

}

//Elimina un ejercicio de la base de datos
const eliminate = (req,res) => {

    let id = req.params.id

    Exercise.findByIdAndRemove(id).then(exerciseDeleted => {
        if(!exerciseDeleted) {
            return res.status(500).json({
                status: "error",
                message: "No se ha podido eliminar el ejercicio",
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Se ha eliminado correctamente el ejercicio",
            exerciseDeleted
        })
    }).catch(error => {
        return res.status(500).json({
            status: "error",
            message: "Se ha producido un error al intentar eliminar el ejercicio",
        })
    })
}


//Muestra todos los ejercicios de un músculo de la base de datos 
const exercises = (req, res) => {
    
    
    Exercise.find().then(exercises => {
        return res.status(200).json({
            status: "success",
            message: "Se han mostrado correctamente los ejercicios",
            exercises
        })
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "No se ha podido mostrar los ejercicios",
            error
        })
    })
    
}

//Muestra todos los ejercicios de un músculo de la base de datos 
const exercisesBy = (req, res) => {
    let muscle = req.params.muscle
    
    Exercise.find({muscle}).then(exercises => {
        return res.status(200).json({
            status: "success",
            message: "Se han mostrado correctamente los ejercicios",
            exercises
        })
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "No se ha podido mostrar los ejercicios",
            error
        })
    })
    
}


module.exports = {
    add,
    eliminate,
    exercises, 
    exercisesBy
}