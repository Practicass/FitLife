

const express = require("express")
const router = express.Router()
const UserController = require("../controllers/usuario")
const auth  = require("../middlewares/auth")


router.get("/prueba", auth.auth, UserController.prueba)
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/profile/:id", auth.auth, UserController.profile)
router.get("/list/:page?", auth.auth, UserController.list)


module.exports = router