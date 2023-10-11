
const express = require("express")
const router = express.Router()
const ExerciseController = require("../controllers/ejercicio")
const auth  = require("../middlewares/auth")


router.get("/prueba",  ExerciseController.prueba)



module.exports = router