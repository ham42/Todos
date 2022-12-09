const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Your Name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name must have atleast 4 characters']
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter Valid Email']
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    minLength: [6, 'Password must have atleast 6 characters'],
    select: false
  },
  role: {
    type: String,
    default: 'user'
  }
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next();
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function(){
  return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema);