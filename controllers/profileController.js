const {User, UserProfile, Post, Category} = require(`../models`)
const getTimeAgo = require(`../helpers/helper`)

class PostController {

    // ============================
    // GET /
    // Menampilkan profile user
    // ============================
    static async showProfile(req, res, next) {
        try {
            const {success} = req.query
            const user = await User.findByPk(req.session.userId, {
                include: [
                    UserProfile,
                    Post
                ],
                order: [[Post, "createdAt", "DESC"]]        
            });

            if (!user) {
                throw new Error("User not found");
            }

            res.render("showProfile", {
                user,
                currentUserId : req.session.userId,
                success,
                getTimeAgo
            });
        } catch (error) {
            next(error);

        }

    }

}

module.exports = PostController;