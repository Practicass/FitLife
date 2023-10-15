
const Friend = require("../models/friendSchema")
const User = require("../models/usersSchema")

const mongoosePaginate = require("mongoose-pagination")
const friendService = require("../services/friendService")



const prueba = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde friend",
        usuario: req.user
    })
}


const add = async(req, res) => {
    
    let params = req.body

    let me = req.user

    if(!params.friend){
        return res.status(500).send({
            status: "error",
            message: "Faltan datos por enviar"
            
        })
    }

    //esto no se si es necesario
    if(!User.find({id: params.id})){
        return res.status(500).send({
            status: "error",
            message: "No existe ese usuario"
            
        })
    }

    //esto no se si es necesario
    let hola = await Friend.find({user: me.id, friend: params.friend})
    let hola2 = await Friend.find({user: params.friend, friend: me.id})
    if( hola.length != 0 || hola2.length != 0){
        return res.status(500).send({
            status: "error",
            message: "Ya sois amigos"
            
        })
    }

    let newFriend = new Friend({
        user: me.id,
        friend: params.friend
    })


    let friendStored = await newFriend.save()

    if(!friendStored){
        return res.status(500).send({
            status: "error",
            message: "Error al guardar el friend"
            
        })
    }
    return res.status(200).send({
        status: "success",
        friendStored
    })
}


const eliminate = async(req, res) => {
    
    let idFriend = req.params.id

    let me = req.user.id

    if(!idFriend){
        return res.status(500).send({
            status: "error",
            message: "Faltan datos por enviar"
            
        })
    }

    Friend.deleteOne({user: me, friend: idFriend})
    .then((friendRemoved, error) => {

        if(friendRemoved.deletedCount == 0 || error ){
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



const friends = (req,res) => {

    let userId = req.user.id

    if(req.params.id) userId = req.params.id

    let page = 1;

    if(req.params.page) page = req.params.page

    const itemsPerPage= 5 


    Friend.find({$or: [{user: userId},{friend: userId}]})
    .populate("user friend", "-password -role -__v -email")
    .paginate(page,itemsPerPage)
    .then(async(friends, error) => {
        
        console.log()
        let friendsIds = await friendService.friendUserids(userId)


        return res.status(200).send({
            status: "success",
            message: "Listado de amigos",
            friends,
            total: friends.length,
            pages: Math.ceil(friends.length/itemsPerPage),
            friendsIds
        })
    })

    
}


        
    







module.exports = {
    prueba,
    add,
    eliminate,
    friends
}