
const express = require("express")
const router = express.Router()
const ExerciseController = require("../controllers/ejercicio")




router.post("/add",  ExerciseController.add)
router.delete("/eliminate/:id",  ExerciseController.eliminate)
router.get("/exercises/:muscle", ExerciseController.exercises)



module.exports = router