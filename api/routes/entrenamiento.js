

const express = require("express")
const router = express.Router()
const TrainingController = require("../controllers/entrenamiento")
const auth  = require("../middlewares/auth")


router.get("/prueba",  TrainingController.prueba)
router.post("/add", auth.auth, TrainingController.add)
router.delete("/eliminate/:id", auth.auth, TrainingController.eliminate)
router.get("/trainings/:page?", auth.auth,TrainingController.trainings)
router.get("/trainings/:id/:page?", auth.auth,TrainingController.trainingsUser)



module.exports = router