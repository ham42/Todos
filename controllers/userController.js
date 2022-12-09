const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/sendToken');


// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password} = req.body;

    const user = await User.create({ name, email, password });

    sendToken(user, 201, res);
});


// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please Enter Email & Password', 400));
    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler('Please Enter Valid Email & Password', 400))
    }

    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler('Please Enter Valid Email & Password', 400))
    }

    sendToken(user, 200, res);
});


// Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User Successfully Logged Out'
    })
});