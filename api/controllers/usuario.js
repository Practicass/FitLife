
const User = require("../models/usersSchema")
const bcrypt = require("bcrypt")
const jwt = require("../services/jwt")

const friendService = require("../services/friendService")



const prueba = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde user",
        usuario: req.user
    })
}


const register = (req, res) => {

    let params = req.body

    if(!params.name || !params.surname || !params.email || !params.password || !params.nick){

        return res.status(400).json({
            status: "error",
            message: "Faltas datos por enviar"
        })
    }


    User.find({ $or: [
        {email: params.email.toLowerCase()},
        {nick: params.nick.toLowerCase()}]})
        .then( (users) => {
            

            if(users && users.length >= 1){
                return res.status(200).send({
                    status: "success",
                    message: "El usuario ya existe"
                })
            }else{
                    
                    bcrypt.hash(params.password, 10,async (error, pwd) => {
                        
                        if(error ) return res.status(500).json({status: "error", message: "Error en la encriptación de la contraseña"})
                        params.password = pwd
                    
                        let newUser = new User(params)
                        
                        let userStored = await newUser.save()
                            if(!userStored) return res.status(500).send({status: "error", message: "Error al guardar el usuario"})
        
                            if(userStored){
        
                                return res.status(200).json({
                                    status: "success",
                                    message: "Usuario registrado correctamente",
                                    newUser
                                })
                            }
                        
                    }) 

            }
        })
        .catch((error) => {
            return res.status(500).json({
                status: "error",
                message: "Error en la consulta de usuarios",
                error
            })
        })  

    
    

}



const login = (req, res) => {
    
    let params = req.body

    if(!params.email || !params.password){

        return res.status(400).json({
            status: "error",
            message: "Faltas datos por enviar"
        })
    }

    User.findOne({email: params.email.toLowerCase()})
    .then(async(user,error) => {
        if(error || !user) return res.status(500).json({status: "error", message: "Error en la consulta de usuarios"})
        
        let pwd = await bcrypt.compareSync(params.password, user.password)
       
        if(!pwd){
            return res.status(400).send({
                status: "error",
                message: "La contraseña no es correcta"
            })
        }

        const token = jwt.createToken(user)


        return res.status(200).send({
            status: "success",
            message: "Login correcto",
            user: {
                id: user._id,
                name: user.name,
                nick: user.nick
            },
            token
        })


    })
}


//función que devuelva la informacion de un usuario
const profile = (req, res) => {

    id = req.params.id

    User.findById(id)
    .select({password:0, role:0})
    .then(async(user,error) => {
        if(error || !user) return res.status(500).json({status: "error", message: "El usuario no existe o hay un error"})
        
        let friendInfo = await friendService.friendThisUser(req.user.id , id)

        return res.status(200).send({
            status: "success",
            user,
            friends: friendInfo.res
            
        })


    })
}

const list = (req, res) => {

    let page = 1;
    if(req.params.page){
      page = req.params.page;
    }
    page = parseInt(page);
  
    let itemsPerPage = 5;
  
    User.find().sort('_id').select("-password -email -role -__v").paginate(page, itemsPerPage).then(async (users,error) => {

        if(error ||!users){
          return res.status(500).send({
            status: "error",
            message: "No hay usuarios disponibles",
            error
          })
        }
  
        let friendIds = await friendService.friendUserids(req.user.id)
  
        return res.status(200).send({
          status: "success",
          users,
          page,
          itemsPerPage,
          friends: friendIds
        })
    })
  
    
  }

//funcion que devuelve la imágen de un usuario
const avatar = ( req, res) => {
    
}

//funcion que elimina un usuario
const deleteUser = (req, res) => {
    
}

// funcion que modifica un usuario
const modUser = ( req, res) => {
    
}
// funcion que modifica la foto del usuario
const uploadImg = ( req, res) => {
    
}







module.exports = {
    prueba,
    register,
    login,
    profile,
    list,
    avatar,
    deleteUser,
    modUser,
    uploadImg
}