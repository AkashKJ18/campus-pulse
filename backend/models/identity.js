const mongoose = require('mongoose');
const IdentitySchema = mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required!'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true
    },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    status: {
        type: String,
        required: [true, 'Status is required!']
    }
});

module.exports = mongoose.model('Identity', IdentitySchema);