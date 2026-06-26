const session = require("express-session");
const {User, UserProfile, Post, Category, PostCategory} = require(`../models`)
const getTimeAgo = require(`../helpers/helper`)

class PostController {
    // ============================
    // GET /posts/add
    // Form tambah post
    // ============================
    static async addForm(req, res, next) {
        try {
            console.log("masuk");
            const categories = await Category.findAll();

            res.render("addPost", {
                categories
            });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    // ============================
    // POST /posts/add
    // Simpan post baru
    // ============================
    static async createPost(req, res, next) {
        try {
            
        
            const {
                description,
                CategoryId
            } = req.body;

            const newPost =  await Post.create({
                description,
                imageUrl : req.file
                ? "/uploads/" + req.file.filename
                : null,
                UserId: req.session.userId
            });
           
            
           if (CategoryId) {
            const categories = Array.isArray(CategoryId)
                ? CategoryId
                : [CategoryId];
            const data = categories.map(id => ({
                PostId: newPost.id,
                CategoryId: id
            }));
            await PostCategory.bulkCreate(data);
        }

            res.redirect("/");
        } catch (error) {
            console.log(error ,"><><><><><>");
            next(error);
        }
    }

    // ============================
    // GET /posts/:id/edit
    // Form edit
    // ============================
    static async editForm(req, res, next) {
        try {

            const { id } = req.params;

            const post = await Post.findByPk(id);

            res.render("editPost", {
                post
            });

        } catch (error) {
            next(error);
        }
    }

    // ============================
    // POST /posts/:id/edit
    // Update postingan
    // ============================
    static async updatePost(req, res, next) {
        try {

            const { id } = req.params;

            const {
                description
            } = req.body;
            const post = await Post.findByPk(id)
            if (!post) {
                throw new Error("Post not found")
            }
            let imageUrl = post.imageUrl

            if (req.file) {
            imageUrl = "/uploads/" + req.file.filename;}

            await Post.update({
                description,
                imageUrl
            }, {
                where: {
                    id
                }
            });

            res.redirect("/");

        } catch (error) {
            next(error);
        }
    }

    // ============================
    // GET /posts/:id/delete
    // Hapus postingan
    // ============================
    static async deletePost(req, res, next) {
        try {
            let msg = "Post has been deleted"
            const { id } = req.params;
            const post = await Post.findByPk(id)
            await post.destroy();

            res.redirect(`/profile?success=${msg}`);

        } catch (error) {
            next(error);
        }
    }

}

module.exports = PostController;