const express = require("express")
const router = express.Router()
const RutineController = require("../controllers/rutina")
const auth  = require("../middlewares/auth")



router.post("/add",  auth.auth, RutineController.add)
router.delete("/eliminate/:id",  auth.auth, RutineController.eliminate)
router.get("/rutines",  auth.auth, RutineController.rutines)
router.put("/update/:id",  auth.auth, RutineController.update)
router.get("/rutine/:id",  auth.auth, RutineController.routine)


module.exports = router