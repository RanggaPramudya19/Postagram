const {User, UserProfile, Post, Category} = require(`../models`)

class ProfileController {

    // GET /profile
    static async showProfile(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    // GET /profile/edit
    static async editForm(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    // POST /profile/edit
    static async updateProfile(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = ProfileController