

const express = require("express")
const router = express.Router()
const UserController = require("../controllers/usuario")
const auth  = require("../middlewares/auth")


router.get("/prueba", auth.auth, UserController.prueba)
router.get("/register", UserController.register)
router.get("/login", UserController.login)
router.get("/profile/:id", auth.auth, UserController.profile)


module.exports = router