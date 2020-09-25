const mongoose = require('../../database')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({ 
    
    name:{ 
        type: String,
        require: true,
    },
    email:{ 
        type:String,
        unique:true, 
        require: true,
        lowercase:true
    },
    password:{
        type:String, 
        require: true, 
        select:false,
        require: true,
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    occupation: {
        type: String,
        require: true,
        lowercase: true,
        default:"Estudante"
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false,
    },
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

const User = mongoose.model('User',UserSchema)

module.exports = User
