const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    },

    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    }
})

UserSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error('unable to login')
    }


    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch){
        throw new Error('unable to login')
    }

    return user

}

UserSchema.pre('save', async function (next){

    const user = this

    if(user.isModified('password')){ // this will be true when user is first created and if password is updated
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()

})

const User = mongoose.model('users', UserSchema)


// const me  = new User({name: 'Garvit ',email:'g@gmail.com', age:21, password:'Garvit@1234'})

// me.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })


module.exports = User
