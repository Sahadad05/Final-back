const mongoose              = require('mongoose')
const Schema                = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  username:{
    type: String,
    require: true,
    unique: true
  },
  email:{
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin','user'],
    default: 'user'
  },
  tickets: {
    type: Number,
    default: '2'
  },
  attendant: {
    type: String,
    enum: ['yes','no'],
    default: 'yes'
  },
  photoURL: String,
  pictures:[
      {
          type: Schema.Types.ObjectId,
          ref: "Picture"
        }
    ]
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }

})


userSchema.plugin(passportLocalMongoose, {usernameField: 'email'})
module.exports = mongoose.model('User', userSchema)