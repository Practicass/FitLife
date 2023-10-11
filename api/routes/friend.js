

const express = require("express")
const router = express.Router()
const FriendController = require("../controllers/friend")
const auth  = require("../middlewares/auth")


router.get("/prueba", FriendController.prueba)
router.post("/add", auth.auth, FriendController.add)
router.delete("/eliminate/:id", auth.auth, FriendController.eliminate)
router.get("/friends/:id?/:page?", auth.auth, FriendController.friends)



module.exports = router