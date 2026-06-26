const router = require('express').Router()
const PostController = require('../controllers/postController')
const authentication = require('../middlewares/auth')
const upload = require('../middlewares/multer')

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
| Bisa diakses Guest dan User
|--------------------------------------------------------------------------
*/



/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES
|--------------------------------------------------------------------------
| Hanya User yang sudah login
|--------------------------------------------------------------------------
*/

router.use(authentication)

// Menampilkan form tambah post
router.get('/post/add', PostController.addForm)
router.post("/post/add",upload.single("image"),PostController.createPost);


// Menampilkan form edit post
router.get('/post/:id/edit', PostController.editForm)

// Menyimpan perubahan post
router.post("/post/:id/edit",upload.single("image"),
PostController.updatePost
);

// Menghapus post
router.get('/post/:id/delete', PostController.deletePost)


module.exports = router