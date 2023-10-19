
const express = require("express")
const router = express.Router()
const StatController = require("../controllers/estadistica")
const auth  = require("../middlewares/auth")


router.post("/add", auth.auth, StatController.add)
router.delete("/eliminate/:id", auth.auth,  StatController.eliminate)
router.get("/stats/:category", auth.auth, StatController.stats)



module.exports = router