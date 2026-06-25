const router = require('express').Router()
const PostController = require('../controllers/postController')
const authentication = require('../middlewares/authentication')

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
| Bisa diakses Guest dan User
|--------------------------------------------------------------------------
*/

// Menampilkan seluruh postingan
router.get('/', PostController.showPosts)

// Menampilkan detail satu postingan
router.get('/:id', PostController.detailPost)

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES
|--------------------------------------------------------------------------
| Hanya User yang sudah login
|--------------------------------------------------------------------------
*/

router.use(authentication)

// Menampilkan form tambah post
router.get('/add', PostController.addForm)

// Menyimpan post baru
router.post('/add', PostController.createPost)

// Menampilkan form edit post
router.get('/:id/edit', PostController.editForm)

// Menyimpan perubahan post
router.post('/:id/edit', PostController.updatePost)

// Menghapus post
router.get('/:id/delete', PostController.deletePost)

// Memberikan like pada post
router.post('/:id/like', PostController.likePost)

module.exports = router