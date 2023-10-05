
const usuario = require("../models/usuario")
const User = require("../models/usuario")
const bcrypt = require("bcrypt-nodejs")



const prueba = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde user"
    })
}


const register = (req, res) => {

    let params = req.body

    if(!params.name || !params.email || !params.password){

        return res.status(400).json({
            status: "error",
            message: "Faltas datos por enviar"
        })
    }

    

    User.find({ or: [
        {email: params.email.toLowerCase()},
        {nick: params.name.toLowerCase()}
    ]}).exec(async(error, users) => {

        if(error) return res.status(500).json({status: "error", message: "Error en la consulta de usuarios"})

        if(users && users.length >= 1){
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            })
        }else{

            let pwd = await bcrypt.hash(params.password, 10)
            params.password = pwd

            let newUser = new User(params)

            newUser.save((error, userStored) => {
                if(error || !userStored) return res.status(500).send({status: "error", message: "Error al guardar el usuario"})

                if(userStored){

                    return res.status(200).json({
                        status: "success",
                        message: "Usuario registrado correctamente",
                        newUser
                    })
                }
            })


            return res.status(200).json({
                status: "success",
                message: "El usuario se ha registrado correctamente",
                newUser
            })
        }
    })

    return res.status(200).send({
        message: "Registrando",
        params
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
    .exec((error,users) => {

        if(error || !user) return res.status(500).json({status: "error", message: "Error en la consulta de usuarios"})

        let pwd = bcrypt.compareSync(params.password, user.password)

        if(!pwd){
            return res.status(400).send({
                status: "error",
                message: "La contraseña o el email no corresponden"
            })
        }

        const token = false


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

module.exports = {
    prueba,
    register
}