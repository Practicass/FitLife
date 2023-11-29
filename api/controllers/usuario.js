
const User = require("../models/usersSchema")
const Friend = require("../models/friendSchema")
const Training = require("../models/trainingSchema")
const bcrypt = require("bcrypt")
const jwt = require("../services/jwt")
const fs = require("fs");
const path = require("path");

const friendService = require("../services/friendService")





//Añade un nuevo usuario a la base de datos
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
                return res.status(400).send({
                    status: "error",
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


//Comprueba que los datos introducidos por el usuario existen y que son correctos
//Si no existen muestra un error, si existe inicia sesión
const login = (req, res) => {
    
    let params = req.body

    if(!params.email || !params.password){

        return res.status(400).json({
            status: "error",
            message: "Faltas datos por enviar"
        })
    }

    User.findOne({email: params.email})
    .then(async(user,error) => {
        if(error || !user) return res.status(500).json({status: "error", message: "Error en la consulta de usuarios"})
        
        let pwd = bcrypt.compareSync(params.password, user.password)
       
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
                // name: user.name,
                // nick: user.nick
                rol: user.rol
            },
            token
            
        })


    })
}


//Devuelve la informacion de un usuario
const profile = (req, res) => {

    let id = req.params.id

    if(id == req.user.id){
        User.findById(id)
        .select({password:0, role:0}).then(user => {
            return res.status(200).send({
                status: "success",
                user
                
            })
        })
    }else{

        User.findById(id)
        .select({password:0, role:0})
        .then(async(user) => {
            if(!user) return res.status(500).json({status: "error", message: "El usuario no existe"})

            let friendInfo = await friendService.friendThisUser(req.user.id , id)

            return res.status(200).send({
                status: "success",
                user: friendInfo
                
            })


        }).catch(error => {
            return res.status(500).json({status: "error", message: "Se ha producido un error en la consulta de usuarios"})
        })

    }

    
}



//Devuelve la informacion de un usuario
const profileById = (req, res) => {

    let id = req.params.id

        User.findById(id)
        .select({password:0, role:0})
        .then(async(user) => {
            if(!user) return res.status(500).json({status: "error", message: "El usuario no existe"})


            return res.status(200).send({
                status: "success",
                
                user
                
            })


        }).catch(error => {
            return res.status(500).json({status: "error", message: "Se ha producido un error en la consulta de usuarios"})
        })

}

    






//Modifica un usuario
const update = (req, res) => {

    let userIdentity = req.user;
    let userToUpdate = req.user;
    if(req.body.name){
        userToUpdate.name = req.body.name
    }
    if(req.body.surname){
        userToUpdate.surname = req.body.surname
    }
    if(req.body.email){
        userToUpdate.email = req.body.email
    }
    if(req.body.password){
        userToUpdate.password = req.body.password
    }
    if(req.body.nick){
        userToUpdate.nick = req.body.nick
    }
    if(req.body.sex){
        userToUpdate.sex = req.body.sex
    }

   
    delete userToUpdate.iat;
    delete userToUpdate.exp;
    delete userToUpdate.role;
    delete userToUpdate.image;

    // Comprobar si el usuario ya existe
    User.find({$or: [{email: userToUpdate.email},{ nick: userToUpdate.nick}]}).then(async (users) => {


        let userIsset = false;
        users.forEach(user => {
            if (user && user._id != userIdentity.id) userIsset = true;
        });

        if (userIsset) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });
        }

        // Cifrar la contraseña
        if (userToUpdate.password) {
            let pwd = await bcrypt.hash(userToUpdate.password, 10);
            userToUpdate.password = pwd;

            //añadido
        }else{
            delete userToUpdate.password;
        }

        // Buscar y actualizar 
        try {
            let userUpdated = await User.findByIdAndUpdate(userIdentity.id, userToUpdate, { new: true });

            if (!userUpdated) {
                return res.status(400).json({ status: "error", message: "Error al actualizar" });
            }

            // Devolver respuesta
            return res.status(200).send({
                status: "success",
                message: "Metodo de actualizar usuario",
                user: userUpdated
            });

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al actualizar",
            });
        }

    }).catch(error => {
        return res.status(500).json({ status: "error", message: "Error en la consulta de usuarios" })
    });
}

//Modifica la imagen del usuario
const upload = (req, res) => {

    // Recoger el fichero de imagen y comprobar que existe
    if (!req.file) {
        return res.status(404).send({
            status: "error",
            message: "Petición no incluye la imagen"
        });
    }

    // Conseguir el nombre del archivo
    let image = req.file.originalname;

    // Sacar la extension del archivo
    const imageSplit = image.split("\.");
    const extension = imageSplit[1];

    // Comprobar extension
    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {

        // Borrar archivo subido
        const filePath = req.file.path;
        const fileDeleted = fs.unlinkSync(filePath);

        // Devolver respuesta negativa
        return res.status(400).send({
            status: "error",
            message: "Extensión del fichero invalida"
        });
    }

    // Si si es correcta, guardar imagen en bbdd
    User.findByIdAndUpdate(req.user.id, { image: req.file.filename }, { new: true }).then(userUpdated => {
        if (!userUpdated) {
            return res.status(500).send({
                status: "error",
                message: "Error en la subida del avatar"
            })
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            user: userUpdated,
            file: req.file,
        });
    });

}

//Devuelve la imágen de un usuario
const avatar = (req, res) => {
    // Sacar el parametro de la url
    const file = req.params.file;

    // Montar el path real de la imagen
    const filePath = "./uploads/avatars/" + file;

    // Comprobar que existe
    fs.stat(filePath, (error, exists) => {

        if (!exists) {
            return res.status(404).send({
                status: "error",
                message: "No existe la imagen"
            });
        }

        // Devolver un file
        return res.sendFile(path.resolve(filePath));
    });

}

// Devuelve el número de amigos de un usuario y el número de entrenamientos realizados por un usuario
const counters = async (req, res) => {

    let userId = req.user.id;

    if (req.params.id) {
        userId = req.params.id;
    }

    try {

        let friends = await Friend.count({"user": userId })
        let friends2 = await Friend.count({"friend": userId})
        

        const trainings = await Training.count({ "user": userId });

        return res.status(200).send({
            userId,
            friends: friends + friends2,
            trainings
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en los contadores",
            error
        });
    }
}

const searchUsers = async (req, res) => {
    try {
        let searchTerm = req.params.searchTerm
        let userId = req.user.id
        if (!searchTerm) {
            return res.status(400).send({
                status: "error",
                message: "Falta el término de la busqueda"
            })
        }

        const regex = new RegExp(searchTerm, 'i')
        const friends = await friendService.friendUserids(req.user.id )
        const friendIds = friends.friends.map((friend) => friend._id);
        const users = await User.find({
            $and: [
                {
                    $or: [
                        { name: regex },
                        { surname: regex },
                        { nick: regex },
                        { email: regex },
                    ]
                },
                { _id: { 
                            $ne: userId
                        , 
                            $nin: friendIds
                        }
                }
            ]
        })
        return res.status(200).send({
            status: "success",
            users
        })
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en la busqueda de usuarios",
            error
        })
    }
}

module.exports = {
    
    register,
    login,
    profile,
    profileById,
    update,
    avatar,
    upload,
    counters,
    searchUsers
}