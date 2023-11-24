
const express = require("express")
const router = express.Router()
const StatController = require("../controllers/estadistica")
const auth  = require("../middlewares/auth")


router.post("/add", auth.auth, StatController.add)
router.delete("/eliminate/:id", auth.auth,  StatController.eliminate)
router.delete("/eliminateLast", auth.auth,  StatController.eliminateLast)
router.get("/stats/:category", auth.auth, StatController.stats)
router.get("/trainings", auth.auth, StatController.trainings)
router.get("/statsLastFive/:category", auth.auth, StatController.statsLastFive)




module.exports = router