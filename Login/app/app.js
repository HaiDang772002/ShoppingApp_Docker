const express = require('express')
const dotenv = require('dotenv'); dotenv.config()
const app = express();
const session = require('express-session')
const path = require('path')
const user = require('./controllers/user');
const login = require('./controllers/login');
const mongoose = require('mongoose')
const dbURL = process.env.mongoDB_URL
mongoose.connect(dbURL).then(() => {
    app.listen(3000, () => {
        console.log('...Running on port 3000')
    })
    console.log('Connect successfully to DB')
})
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/views/public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'mySecretSign',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000 * 1000
    }
}))
app.use('/login', login)
app.use('/users', (req, res, next) => {
    if (req.session.user) {
        next()
    }
    else {
        res.send(`<h1>You need login to access user management</h1>
        <a href="/"><span>Go to login page</span></a>`)
    }
}, user)
app.get('/', (req, res) => {
    res.redirect('/login')
})
