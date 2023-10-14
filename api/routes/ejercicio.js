
const express = require("express")
const router = express.Router()
const ExerciseController = require("../controllers/ejercicio")
const auth  = require("../middlewares/auth")


router.get("/prueba",  ExerciseController.prueba)
router.post("/add",  ExerciseController.add)
router.delete("/eliminate/:id",  ExerciseController.eliminate)



module.exports = router