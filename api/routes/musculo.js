

const express = require("express")
const router = express.Router()
const MuscleController = require("../controllers/musculo")
const auth  = require("../middlewares/auth")


router.get("/prueba",  MuscleController.prueba)
router.post("/add",  MuscleController.add)
router.delete("/eliminate",  MuscleController.eliminate)



module.exports = router