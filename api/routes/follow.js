

const express = require("express")
const router = express.Router()
const FollowController = require("../controllers/follow")
const auth  = require("../middlewares/auth")


router.get("/prueba", FollowController.prueba)
router.get("/follow", auth.auth, FollowController.follow)
router.get("/unfollow/:id", auth.auth, FollowController.unfollow)



module.exports = router