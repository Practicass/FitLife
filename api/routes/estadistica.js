
const express = require("express")
const router = express.Router()
const StatController = require("../controllers/estadistica")
const auth  = require("../middlewares/auth")


router.get("/prueba",  StatController.prueba)
router.post("/add",  StatController.add)
router.delete("/eliminate/:id",  StatController.eliminate)
router.get("/stats/:category", StatController.stats)



module.exports = router