const { Router } = require('express')
const router = Router()
const myLoginModel = require('../models/loginModel')
const { signInDataEjs, signUpDataEjs } = require('./dataJsToEJS')

router.get('/', (req, res) => {
    res.render('homeLogin', { title: 'Login' })
})
router.get('/sign-in', (req, res) => {
    res.render('signIn', { ...signInDataEjs })
})
router.post('/sign-in', (req, res) => {
    const { username, password } = req.body
    myLoginModel.findOne({ username: username, password: password }).then(user => {
        if (user) {
            req.session.userID = user.id
            req.session.user = username
            req.session.cart = []
            res.redirect('/users')
        }
        else {
            res.render('signIn', { ...signInDataEjs, message: 'Tài khoản này không tồn tại', username: username, password: password })
        }
    })
})
router.get('/sign-up', (req, res) => {
    res.render('signUp', { ...signUpDataEjs })
})

router.post('/sign-up', (req, res) => {
    const { username, password, email } = req.body

    myLoginModel.findOne({ $or: [{ username: username }, { email: email }] })
        .then(user => {
            if (user) {
                res.render('signUp', { ...signUpDataEjs, message: 'Tên đăng nhập hoặc email đã tồn tại', username: username, password: password, email: email })
            }
            else {
                const account = new myLoginModel({ username, password, email })
                account.save().then(() => {
                    res.render('signUp', { ...signUpDataEjs, message: 'Đăng ký thành công', username: username, password: password, email: email })
                })
            }
        })
})
router.get('/logout', (req, res, next) => {
    if (req.session.user) {
        next()
    }
    else {
        res.send("You haven't loggined")
    }
}, (req, res) => {
    req.session.destroy(() => {
        console.log('Session destroyed successfully');
        res.redirect('/login');
    })
})
module.exports = router
