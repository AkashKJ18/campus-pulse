const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    identity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Identity',
        required: true
    },
    firstName: {
        type: String,
        required: [true, 'First name is required!'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!'],
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required!'],
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    designation: { type: String },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'Role is required!']
    },
    status: {
        type: String,
        required: [true, 'Status is required!']
    }
});

module.exports = mongoose.model('User', UserSchema);