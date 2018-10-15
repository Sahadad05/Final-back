const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pictureSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    link: String,
    caption: String,

},{
    timestamps:{
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

module.exports = mongoose.model('Picture', pictureSchema)