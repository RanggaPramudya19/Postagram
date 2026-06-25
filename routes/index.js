const router = require('express').Router()

const authRouter = require('./auth')
const postRouter = require('./posts')
const profileRouter = require('./profile')

router.use('/', authRouter)
router.use('/posts', postRouter)
router.use('/profile', profileRouter)


module.exports = router