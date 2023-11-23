
const Friend = require("../models/friendSchema")
const User = require("../models/usersSchema")

const mongoosePaginate = require("mongoose-pagination")
const friendService = require("../services/friendService")





//Se añaden dos usuarios como amigos 
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
    let aux = await Friend.find({user: me.id, friend: params.friend})
    let aux2 = await Friend.find({user: params.friend, friend: me.id})
    if( aux.length != 0 || aux2.length != 0){
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


//Dos usuarios dejan de ser amigos
const eliminate = async(req, res) => {
    
    let id = req.params.id

    let me = req.user.id


    Friend.deleteOne({$or:[{user: me, friend: id}, {user: id, friend: me}]})
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


//Se muestra el listado de amigos de un usuario
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
        
        //console.log()
        let friendsIds = await friendService.friendUserids(userId)


        return res.status(200).send({
            status: "success",
            message: "Listado de amigos",
            total: friends.length,
            pages: Math.ceil(friends.length/itemsPerPage),
            friendsIds
        })
    })

    
}


        
    
const numFriends = (req,res) => {

    let userId = req.user.id

    if(req.params.id) userId = req.params.id

    Friend.find({$or: [{user: userId},{friend: userId}]})
    .populate("user friend", "-password -role -__v -email")
    .then(async(friends) => {

        return res.status(200).send({
            status: "success",
            message: "Listado de amigos",
            total: friends.length,
        })
    })
}






module.exports = {
    
    add,
    eliminate,
    friends, 
    numFriends
}