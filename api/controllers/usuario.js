
const User = require("../models/usersSchema")
const bcrypt = require("bcrypt")
const jwt = require("../services/jwt")



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


const countFriends = (req, res) => {

}





module.exports = {
    prueba,
    register,
    login,
    profile,
    avatar,
    deleteUser,
    modUser,
    uploadImg,
    countFriends
}