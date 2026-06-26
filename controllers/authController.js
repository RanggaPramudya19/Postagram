const session = require('express-session');
const { User, UserProfile, Post, Category } = require(`../models`)
const bcrypt = require('bcrypt')
const getTimeAgo = require(`../helpers/helper`)
const { Op } = require("sequelize");



class AuthController {

    static async home(req, res, next) {
        const { search, category } = req.query
        try {

            let option = {
                include: [
                            {
                 model: User,
                include: UserProfile
            },
            {
            model: Category,
            through: {
                attributes: []
            }
            }
    ],
    order: [["createdAt", "DESC"]]
};

            if (search) {
                option.where = {
                    description: {

                        [Op.iLike]: `%${search}%`
                    }
                };
            }

            if (category) {
                option.include[1].where = {
                    id: category
                };
                option.include[1].required = true;

            }

            const categories = await Category.findAll();
            const posts = await Post.findAll(option);

            let currentUser = null;

            if (req.session.userId) {
                currentUser = await User.findByPk(req.session.userId, {
                    include: UserProfile
                });
            }

            res.render("home", {
                posts,
                currentUser,
                search,
                categories,
                getTimeAgo
                
            });

        } catch (error) {
            next(error);
        }
    }



    // GET /register
    static async registerForm(req, res, next) {
        try {
            res.render("register");
        } catch (error) {
            next(error);
        }
    }

    // POST /register
    static async register(req, res, next) {
        try {

            const {
                email,
                password,
                fullName,
                bio,
                linkSocmed,
                gender
            } = req.body;

            const newUser = await User.create({
                email,
                password,
                gender,
                role: "User"
            });

            await UserProfile.create({
                fullName,
                bio,
                linkSocmed,
                gender,
                profilePicture: req.file
                    ? "/uploads/" + req.file.filename
                    : null,
                UserId: newUser.id
            });

            res.redirect("/login");

        } catch (error) {
            next(error);
        }
    }

    // GET /login
    static async loginForm(req, res, next) {
        try {
            res.render("login");
        } catch (error) {
            next(error);
        }
    }

    // POST /login
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: { email }
            });

            if (!user) {
                throw new Error("Invalid Email / Password");
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                throw new Error("Invalid Email / Password");
            }

            req.session.userId = user.id;
            req.session.role = user.role;
            req.session.email = user.email;

            res.redirect("/");

        } catch (error) {
            next(error);
        }
    }

    // GET /logout
    static async logout(req, res, next) {
        try {
            req.session.destroy((err) => {
                if (err) return next(err);

                res.redirect("login");
            });

        } catch (error) {
            next(error);
        }
    }

}

module.exports = AuthController;