


const Stat = require("../models/statSchema")



//Añade un nuevo dato del usuario a la base de datos
const add = async (req, res) => {
    

    if(!req.body.name || !req.body.value ){
        return res.status(500).send({
            status:"error",
            message: "Faltan datos por enviar"
        })
    }



    let newStat = new Stat({name: req.body.name, value: req.body.value})
    
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

    Stat.find(id).remove().then(statDeleted => {
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
    
    Stat.find({name: category}).then(stats => {
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



module.exports = {
    add,
    eliminate,
    stats
}