const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userschema = new mongoose.Schema({
    
    cleanerid:{
        type: Number,
        reqcuired: true,
        trim: true,
        unique: true
    },

    password:{
        type: String,
        reqcuired: true,
    },
    name:{
        type: String,
        trim: true,
        reqcuired: true
    },
    hostel:{
        type: String
    }

})

userschema.pre('save', async function(next){

    const cleaner = this
    this.password = await bcrypt.hash(cleaner.password, 8)
    next()

})

const Cleaner = mongoose.model('cleaner', userschema)

userschema.statics.findByCredentials = async(cleanerid, password)=>{
    
    const cleaner = await Cleaner.findOne({cleanerid})
    if(!cleaner){
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, cleaner.password)

    if(!isMatch){
        throw new Error('unable to login')
    }

    return cleaner

}



module.exports = Cleaner