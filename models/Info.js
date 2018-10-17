const mongoose              = require('mongoose')
const Schema                = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const infoSchema = new Schema({
  fianceName:{
    type: String,
    require: true,
    unique: true
  },
  datePicker:{
    type: String,
    required: true
  },
  timePicker:{
    type: String,
    required: true
  },
  placeName:{
    type: String, 
    required: true
  },
  Address:{
    type: String,
    required: true
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


userSchema.plugin(passportLocalMongoose)
// , {usernameField: 'email'}
module.exports = mongoose.model('Info', infoSchema)