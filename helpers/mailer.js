const nodemailer  = require('nodemailer')
const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAILPASS
  }
})

exports.welcomeMail=(username, email)=>{
  
  transporter.sendMail({
    from:'"The Wedding Admin" <contacto.leavethenest@gmail.com>',
    to:email,
    subject:'¡Bienvenido!',
    html:`
      <h2>¡Hola ${username}! </h2>
      <p>
      Nos emociona compartir contigo esta nueva etapa de nuestras vidas
      Para saber todos los detalles acerca de nuestra boda, por favor haz click aquí {link}
      </p>
      <p>
      Usuario: ${email} 
      Contraseña es: password
      </p>

      ¿Estás listo? 😃 
      
    `
  }).then(info=>{
    console.log(info)
  }).catch(error=>{
    console.log(error)
    throw error
  })

}