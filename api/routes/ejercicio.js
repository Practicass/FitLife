
const express = require("express")
const router = express.Router()
const ExerciseController = require("../controllers/ejercicio")




router.post("/add",  ExerciseController.add)
router.delete("/eliminate/:id",  ExerciseController.eliminate)
router.get("/exercises", ExerciseController.exercises)
router.get("/exercisesBy/:muscle", ExerciseController.exercisesBy)



module.exports = router