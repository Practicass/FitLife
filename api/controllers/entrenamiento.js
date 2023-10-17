
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

    let newTraining = new Training({name: req.body.name, user: req.user.id, sets: req.body.sets, public: req.body.public})

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

const eliminate = (req,res) => {

    let id = req.params.id

    Training.findByIdAndRemove(id).then(trainingDeleted => {
        if(!trainingDeleted) {
            return res.status(500).json({
                status: "error",
                message: "No se ha podido eliminar el entrenamiento",
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Se ha eliminado correctamente el entrenamiento",
            trainingDeleted
        })
    }) 
}


const trainings = (req,res) => {

    let page = 1;
    if(req.params.page){
      page = req.params.page;
    }
    page = parseInt(page);
  
    let itemsPerPage = 5;
  
    Training.find().sort('_id').populate("sets.exercise", "-user -__v").paginate(page, itemsPerPage).then(async (trainings,error) => {

        if(error ||!trainings){
          return res.status(500).send({
            status: "error",
            message: "No hay entrenamientos disponibles",
            error
          })
        }
  
        return res.status(200).send({
          status: "success",
          trainings,
          page,
          itemsPerPage
          
        })
    })
  
    

}


module.exports = {
    prueba,
    add,
    eliminate,
    trainings
}