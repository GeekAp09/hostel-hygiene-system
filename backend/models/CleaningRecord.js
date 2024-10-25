const mongoose = require('mongoose')

// for hostlers room and hostel is input and tags as input
// for cleaner hostel is input

const UserSchema = new mongoose.Schema({

    hostel:{
        type: String,
        required: true,
        trim: true
    },

    room:{
        type: Number,
        required: true,
        trim: true
    },

    status:{
        type: String,
        default: "Pending"
    },

    completed:{
        type: Boolean,
        default: false
    },

    tags:{
        type: [String]
    }

},

{
    timestamps: true
}
)

const ToClean = mongoose.model('ToClean', UserSchema)

module.exports = ToClean

