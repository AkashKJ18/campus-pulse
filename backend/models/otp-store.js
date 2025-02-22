const mongoose = require('mongoose');
const OTPSchema = mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    otp: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    }
});

module.exports = mongoose.model('OTPStore', OTPSchema);