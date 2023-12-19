

const express = require("express")
const router = express.Router()
const FriendController = require("../controllers/friend")
const auth  = require("../middlewares/auth")



router.post("/add", auth.auth, FriendController.add)
router.delete("/eliminate/:id", auth.auth, FriendController.eliminate)
router.get("/friends/:id?/:page?", auth.auth, FriendController.friends)
router.get("/numFriends/:id?", auth.auth , FriendController.numFriends)
router.get("/requests/:id?/:page?", auth.auth, FriendController.requests)
router.put("/confirm/:id", auth.auth, FriendController.confirm)




module.exports = router