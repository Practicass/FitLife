
const User = require("../models/usersSchema")
const Friend = require("../models/friendSchema")
const Training = require("../models/trainingSchema")
const bcrypt = require("bcrypt")
const jwt = require("../services/jwt")
const fs = require("fs");
const path = require("path");

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



// funcion que modifica un usuario
const update = (req, res) => {
    // Recoger info del usuario a actualizar
    let userIdentity = req.user;
    let userToUpdate = req.body;

    // Eliminar campos sobrantes
    delete userToUpdate.iat;
    delete userToUpdate.exp;
    delete userToUpdate.role;
    delete userToUpdate.image;

    // Comprobar si el usuario ya existe
    User.find({
        $or: [
            { email: userToUpdate.email.toLowerCase() },
            { nick: userToUpdate.nick.toLowerCase() }
        ]
    }).exec(async (error, users) => {

        if (error) return res.status(500).json({ status: "error", message: "Error en la consulta de usuarios" });

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
            let userUpdated = await User.findByIdAndUpdate({ _id: userIdentity.id }, userToUpdate, { new: true });

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

    });
}

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

//funcion que devuelve la imágen de un usuario
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

// añadido
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









module.exports = {
    prueba,
    register,
    login,
    profile,
    list,
    update,
    avatar,
    upload,
    counters
}