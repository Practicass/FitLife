

const express = require("express")
const router = express.Router()
const TrainingController = require("../controllers/entrenamiento")
const auth  = require("../middlewares/auth")



router.post("/add", auth.auth, TrainingController.add)
router.delete("/eliminate/:id", auth.auth, TrainingController.eliminate)
router.get("/trainingsFriends/:page?", auth.auth,TrainingController.trainings)
router.get("/trainings/:page?/:id?", auth.auth,TrainingController.trainingsUser)
router.get("/trainingsLast/:id?", auth.auth,TrainingController.trainingsUserLastPage)




module.exports = router