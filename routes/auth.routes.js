const router = require('express').Router();
const User = require('../models/User.model')
const bcryptjs = require('bcryptjs');
const saltRounds = 12;

router.get('/signup',(req,res)=> res.render('auth/signup'))

router.post('/signup',(req,res)=>{
    const {username, email, password} = req.body

    bcryptjs
    .genSalt(saltRounds)
    .then(salt=> bcryptjs.hash(password,salt))
    .then(hashedPassword => User.create({username, password: hashedPassword}))
    .then(()=> res.redirect('user/userProfile'))
    .catch(error => next(error));
})

router.post('/login',(req,res)=>{
    const {email, password} = req.body

    User.findOne({email})
    .then((user) => {
    })
})

router.get('/login',(req,res)=> res.render('auth/login'))

module.exports = router