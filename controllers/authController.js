class AuthController {

    // GET /register
    static async registerForm(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }

    // POST /register
    static async register(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    // GET /login
    static async loginForm(req, res) {
        try {
            res.render('login')
        } catch (error) {
            res.send(error)
        }
    }

    // POST /login
    static async login(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    // GET /logout
    static async logout(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = AuthController