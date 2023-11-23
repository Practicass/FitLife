


const Stat = require("../models/statSchema")
const trainingSchema = require("../models/trainingSchema")
const Training = require("../models/trainingSchema")



//Añade un nuevo dato del usuario a la base de datos
const add = async (req, res) => {
    

    if(!req.body.name || !req.body.value ){
        return res.status(500).send({
            status:"error",
            message: "Faltan datos por enviar"
        })
    }



    let newStat = new Stat({user: req.user.id, name: req.body.name, value: req.body.value})
    
    let statStored = await newStat.save()

    if(!statStored){
        return res.status(500).send({
            status:"error",
            message: "No se ha podido guardar el dato"
        })
    }
    return res.status(200).send({
        status:"success",
        message: "Se ha guardado el dato correctamente"
    })
 

}

//Elimina un dato del usuario de la base de datos
const eliminate = (req,res) => {

    let id = req.params.id

    Stat.findOneAndRemove({_id: id, user: req.user.id}).then(statDeleted => {
        if(!statDeleted) {
            return res.status(500).json({
                status: "error",
                message: "No se ha podido eliminar el dato",
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Se ha eliminado correctamente el dato",
            statDeleted
        })
    })
}

//Muestra los datos de un usuario
const stats = (req, res) => {

    let category = req.params.category
    
    Stat.find({user: req.user.id, name: category}).then(stats => {
        return res.status(200).json({
            status: "success",
            message: "Se han mostrado correctamente los datos del usuario",
            stats
        })
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "No se ha podido mostrar los datos del usuario",
            error
        })
    })
    
}

const trainings = (req, res) => {
    const fechaActual = new Date();
    mesActual = fechaActual.getMonth()
    const fechaSeisMesesAtras = new Date(fechaActual.getFullYear(), mesActual, 1);
    fechaSeisMesesAtras.setMonth(mesActual - 5);
    let mes = [0,0,0,0,0,0]
    let mesNombre = []
    
    Training.find({user: req.user.id, created_at:  { $gte: fechaSeisMesesAtras, $lte: fechaActual}}).then(trainings => {
        for(let i=0; i<trainings.length ; i++){
            let aux = trainings[i].created_at.getMonth()
            aux == mesActual - 5 ? 
                mes[0]++ :
            aux == mesActual - 4 ? 
                mes[1]++  :
            aux == mesActual - 3 ? 
                mes[2]++  :
            aux == mesActual - 2 ? 
                mes[3]++  :
            aux == mesActual - 1 ? 
                mes[4]++  :
                mes[5]++ 
        }
        for(let n=5; n>=0; n--){
            mesNombre[n] = fechaActual.toLocaleDateString('es-ES', {month: 'short'})
            fechaActual.setMonth(fechaActual.getMonth() - 1);
            
        }
        
        return res.status(200).json({
            status: "success",
            message: "Se han mostrado correctamente los datos del usuario",
            stats: {
                mesNombre,
                mes
            }
        })
        
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "No se ha podido mostrar los datos del usuario",
            error
        })
    })

}


module.exports = {
    add,
    eliminate,
    stats,
    trainings
}