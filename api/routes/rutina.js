const express = require("express")
const router = express.Router()
const RutineController = require("../controllers/rutina")
const auth  = require("../middlewares/auth")



router.post("/add",  auth.auth, RutineController.add)
router.delete("/eliminate/:id",  auth.auth, RutineController.eliminate)
router.get("/rutines",  auth.auth, RutineController.rutines)
router.get("/routine/:id",  auth.auth, RutineController.routine)
router.put("/update/:id",  auth.auth, RutineController.update)


module.exports = router