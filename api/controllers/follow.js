
const Follow = require("../models/follow")
const User = require("../models/usuario")



const prueba = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde follow",
        usuario: req.user
    })
}


const follow = async(req, res) => {
    
    let params = req.body

    let me = req.user

    if(!params.followed){
        return res.status(500).send({
            status: "error",
            message: "Faltan datos por enviar"
            
        })
    }

    let newFollow = new Follow({
        user: me.id,
        followed: params.followed
    })


    let followStored = await newFollow.save()

    if(!followStored){
        return res.status(500).send({
            status: "error",
            message: "Error al guardar el follow"
            
        })
    }
    return res.status(200).send({
        status: "success",
        followStored
    })
}


const unfollow = async(req, res) => {
    
    let idFollowed = req.params.id

    let me = req.user.id

    if(!idFollowed){
        return res.status(500).send({
            status: "error",
            message: "Faltan datos por enviar"
            
        })
    }

    Follow.deleteOne({user: me, followed: idFollowed})
    .then((followRemoved, error) => {

        if(followRemoved.deletedCount == 0 || error ){
            return res.status(500).send({
                status: "error",
                message: "No se ha podido dejar de seguir"
                
            })
        }
        return res.status(200).send({
            status: "success",
            message: "Se ha dejado de seguir correctamente"
        })

    })
}



        
    







module.exports = {
    prueba,
    follow,
    unfollow
}