const router = require('express').Router()
const ProfileController = require('../controllers/profileController')
const authentication = require('../middlewares/authentication')

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

// Menampilkan form edit profile
router.get('/edit', ProfileController.editForm)

// Menyimpan perubahan profile
router.post('/edit', ProfileController.updateProfile)

module.exports = router