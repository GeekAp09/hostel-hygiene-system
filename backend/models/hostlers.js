const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({

    rollnumber:{
        type: Number,
        required: true,
        unique: true
    },

    name:{
        type: String,
        trime: true,
        required: true
    },

    hostel:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    roomnumber:{
        type: Number,
        required: true,
        trim: true
    }


})

UserSchema.pre('save', async function(next){

    const hostler = this
    this.password = await bcrypt.hash(hostler.password, 8)
    next()

})


const Hostler = mongoose.model('hostlers', UserSchema)

UserSchema.statics.findByCredentials = async(rollnumber, password)=>{
    
    const hostler = await Hostler.findOne({rollnumber})
    
    if(!hostler){
        return new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, hostler.password)

    if(!isMatch){
        throw new Error('unable to login')
    }

    return hostler

}

module.exports = Hostler
