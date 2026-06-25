const router = require('express').Router()
const AuthController = require('../controllers/authController')

/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
| Route yang berhubungan dengan registrasi, login, dan logout user
|--------------------------------------------------------------------------
*/

// Register
router.get('/register', AuthController.registerForm)
router.post('/register', AuthController.register)

// Login
router.get('/login', AuthController.loginForm)
router.post('/login', AuthController.login)

// Logout
router.get('/logout', AuthController.logout)

module.exports = router