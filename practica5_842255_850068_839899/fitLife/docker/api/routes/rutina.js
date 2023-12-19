const express = require("express")
const router = express.Router()
const RutineController = require("../controllers/rutina")
const auth  = require("../middlewares/auth")



router.post("/add",  auth.auth, RutineController.add)
router.delete("/eliminate/:id",  auth.auth, RutineController.eliminate)
router.get("/rutines/:page?",  auth.auth, RutineController.rutines)
router.get("/rutinesUser/:page?",  auth.auth, RutineController.rutinesUser)
router.get("/rutinesAdmin/:page?",  auth.auth, RutineController.rutinesAdmin)
router.get("/rutinesScroll",  auth.auth, RutineController.rutinesScroll)
router.get("/favRutines",  auth.auth, RutineController.favRoutines)
router.put("/update/:id",  auth.auth, RutineController.update)
router.get("/rutine/:id",  auth.auth, RutineController.routine)


module.exports = router