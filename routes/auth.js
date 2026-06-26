const router = require('express').Router()
const AuthController = require('../controllers/authController')
const upload = require("../middlewares/multer");

/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
| Route yang berhubungan dengan registrasi, login, dan logout user
|--------------------------------------------------------------------------
*/
//Home
router.get("/", AuthController.home);

// Register
router.get('/register', AuthController.registerForm)
router.post( "/register",upload.single("profilePicture"),
AuthController.register
);
// Login
router.get('/login', AuthController.loginForm)
router.post('/login', AuthController.login)

// Logout
router.get('/logout', AuthController.logout)

module.exports = router