const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const {generateToken, verifyToken} = require('../helpers/jwt')
const sendMail    = require('../helpers/mailer')


router.post('/signup', (req, res, next)=>{
  User.register(req.body, req.body.password)
  .then(user=>{
    sendMail.welcomeMail(user.username, user.email)
    req.app.locals.loggedUser = user
    return res.status(201).json(user)

  })
  .catch(e=>next(e))
})

router.post('/login',
 passport.authenticate('local'), 
 (req,res,next)=>{
    const token = generateToken(req.user)
    res.status(200).json({token, user:req.user})
})


router.get('/private', verifyToken, (req,res,next)=>{
  res.send("Esto sololo ven los usuarios logueados" + req.user.username)
})


router.get("/user/guests", verifyToken, (req, res) =>{
  User.find()
  .then(users=>{
    console.log(users)
    return res.status(200).json({users});
  })
})


//Agregar invitados
router.post('/user/guests',verifyToken,(req,res,next)=>{
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

router.post('/removeUsers', verifyToken, (req,res,next)=>{
  User.findByIdAndRemove(req.body._id)
  .then(c=>{
    res.status(201).json(c)
  })
  .catch(e=>{
      res.status(500).json(e)
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