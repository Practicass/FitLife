
const express = require("express")
const router = express.Router()
const ExerciseController = require("../controllers/ejercicio")




router.post("/add",  ExerciseController.add)
router.delete("/eliminate/:id",  ExerciseController.eliminate)
router.get("/exercises/:muscle", ExerciseController.exercises)
router.get("/allExercises/", ExerciseController.allExercises)
router.get("/exercises/:muscle", ExerciseController.exercises)
router.put("/update/:id", ExerciseController.update)
router.get("/exerciseById/:id", ExerciseController.exerciseById)



module.exports = router