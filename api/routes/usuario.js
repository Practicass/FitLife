

const express = require("express")
const router = express.Router()
const multer = require("multer");
const UserController = require("../controllers/usuario")
const auth  = require("../middlewares/auth")

// Configuracion de subida
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatars/")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-"+Date.now()+"-"+file.originalname);
    }
});

const uploads = multer({storage});



router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/profile/:id", auth.auth, UserController.profile)
router.get("/list/:page?", auth.auth, UserController.list)
router.put("/update/:id", auth.auth, UserController.update)
router.post("/upload", [auth.auth, uploads.single("file")], UserController.upload)
router.get("/avatar/:file", auth.auth, UserController.avatar)
router.get("/counters/:id?", auth.auth, UserController.counters)



module.exports = router