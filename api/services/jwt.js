

const jwt = require("jwt-simple")
const moment = require("moment")

const secret = "Clave_secreta_que_nadie_puede_saber_de_lifeFit_2023"

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        imagen: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix
    }

    return jwt.encode(payload, secret)
}