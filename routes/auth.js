const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const {generateToken, verifyToken} = require('../helpers/jwt')
const sendMail    = require('../helpers/mailer')


router.post('/api//signup', (req, res, next)=>{
  User.register(req.body, req.body.password)
  .then(user=>{
    sendMail.welcomeMail(user.username, user.email)
    req.app.locals.loggedUser = user
    // res.status(201).json(user)
    res.redirect('/login')

  })
  .catch(e=>next(e))
})

router.post('/api//login',
 passport.authenticate('local'), 
 (req,res,next)=>{
    const token = generateToken(req.user)
    res.status(200).json({token, user:req.user})
})


router.get('/api//private', verifyToken, (req,res,next)=>{
  res.send("Esto sololo ven los usuarios logueados" + req.user.username)
})


router.get("/api//user/guests", verifyToken, (req, res) =>{
  User.find()
  .then(users=>{
    console.log(users)
    return res.status(200).json({users});
  })
})


//Agregar invitados
router.post('/api//user/guests',verifyToken,(req,res,next)=>{
  console.log("perro", req.body);
  const {users} = req.body
  const guests = users.split(',')
  console.log(guests)
  guests.map(e=>{
  const user = {
      email:e,
      username:e,
      attendant: "yes",
      tickets: "2",
      role:'user',
  }          
 User.register(user, 'password')
  .then(user=>{
    sendMail.welcomeMail(user.username, user.email)
    console.log(user)
    res.status(201).json(user)
  }).catch(e=>res.status(500).json(e))
})
})

//Mapa
// router.get('/user/location', (req, res) => {
//   Nidos.find()
//   .then(nidos=>{
//     console.log(nidos)
//     res.render('buscar', {nidos})  
//   })
// })

// router.post('/user/location', (req, res, next) => {
//   req.app.locals.loggedUser = req.user;
//   Nidos.create(req.body)
//   .then(nidos=>{
//   res.redirect('/nidos')
// })
//   .catch(e=>console.log(e))
// })


module.exports = router