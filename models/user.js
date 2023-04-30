const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profilePicture:{
        type:String,
        required:false,
        default:"http://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png"
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    emailAddress:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    isVerified:{
        type:String,
        required: true,
        default: false
    }
    
}, { versionKey: false })

userSchema.set('timestamps', true);
module.exports = mongoose.model('Users', userSchema);