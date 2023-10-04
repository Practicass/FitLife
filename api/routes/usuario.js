

const express = require("express")
const router = express.Router()
const UserController = require("../controllers/usuario")


router.get("/register", UserController.register)


module.exports = router