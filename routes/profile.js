const router = require('express').Router()
const ProfileController = require('../controllers/profileController')
const authentication = require('../middlewares/auth')

/*
|--------------------------------------------------------------------------
| PROFILE ROUTES
|--------------------------------------------------------------------------
| Hanya user yang sudah login yang dapat melihat dan mengubah profile.
|--------------------------------------------------------------------------
*/

router.use(authentication)

// Menampilkan profile user yang sedang login
router.get('/', ProfileController.showProfile)



 module.exports = router