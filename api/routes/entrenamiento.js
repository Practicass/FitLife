

const express = require("express")
const router = express.Router()
const TrainingController = require("../controllers/entrenamiento")
const auth  = require("../middlewares/auth")


router.get("/prueba",  TrainingController.prueba)
router.post("/add", auth.auth, TrainingController.add)
router.get("/trainings/:page?", TrainingController.trainings)



module.exports = router