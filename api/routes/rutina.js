const express = require("express")
const router = express.Router()
const RutineController = require("../controllers/rutina")
const auth  = require("../middlewares/auth")


router.get("/prueba",  RutineController.prueba)



module.exports = router