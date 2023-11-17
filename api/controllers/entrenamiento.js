
const Training = require("../models/trainingSchema")
const Exercise = require("../models/exerciseSchema")
const friendService = require("../services/friendService")



//Añade un nuevo entrenamiento a la base de datos
const add = async(req, res) => {
    
    let sets = req.body.sets
    
    if(sets.length == 0 ){
        return res.status(500).send({
            status:"error",
            message: "No se puede guardar una rutina con 0 ejercicios"
        })
    }
    
    let exercisesIds = sets.map(set => set.exercise)
    //console.log(exercisesIds)
    let exercisesFound = await Exercise.find({_id: {$in: exercisesIds}})
    //console.log(exercisesFound)
    if(exercisesFound.length != sets.length){
        return res.status(500).send({
            status:"error",
            message: "Error en al menos un ejercicio"
        })
    }

    let newTraining = new Training({name: req.body.name, user: req.user.id, sets: req.body.sets, public: req.body.public, duration: req.body.duration})

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

//Elimina un entrenamiento de la base de datos
const eliminate = async(req,res) => {

    let id = req.params.id

    let me = req.user.id


    Training.findOneAndDelete({_id: id, user: me}).then(trainingDeleted => {
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

//Muestra los entrenamientos de los amigos de un usuario
const trainings = async(req,res) => {

    let page = 1;
    if(req.params.page){
      page = req.params.page;
    }
    page = parseInt(page);
  
    let itemsPerPage = 5;
    
    let friendsIds = await friendService.friendUserids(req.user.id)

    Training.find({user: {$in: friendsIds.friends}}).sort('created_at').populate("sets.exercise", "-user -__v").paginate(page, itemsPerPage)
    .then((trainings,error) => {

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

//Muestra todos los entrenamientos de un usuario 
const trainingsUser = (req, res) => {

    idUser = req.user.id

    if(req.params.id){
        idUser = req.params.id
    }

    let page = 1;
    if(req.params.page){
      page = req.params.page;
    }
    page = parseInt(page);
  
    let itemsPerPage = 5;
  
    Training.find({user:idUser}).sort('created_at').populate("sets.exercise", "-user -__v").paginate(page, itemsPerPage).then(async (trainings,error) => {

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

    add,
    eliminate,
    trainings,
    trainingsUser
}