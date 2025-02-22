const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema({
    identity: { type: mongoose.Schema.Types.ObjectId, ref: 'Identity', required: true },
    firstName: { type: String, required: [true, 'First name is required!'] },
    lastName: { type: String, required: [true, 'Last name is required!'] },
    userName: { type: String, unique: [true, "User name Exist!"], required: [true, 'Username is required!'], trim: true },
    dateOfBirth: { type: Date, required: [true, 'Date of birth is required!'] },
    gender: { type: String, required: [true, 'Gender is required!'] },
    email: { type: String, unique: [true, "Email Exist!"], },
    phoneNumber: { type: Number, unique: [true, "Phone number Exist!"], required: [true, 'Phone number is required!'] },
    address: { type: String },
    grade: { type: String },
    section: { type: String, required: [true, 'Section is required!'] },
    course: { type: String, required: [true, 'Course is required!'] },
    registerNumber: { type: String, unique: [true, 'Register number Exist!'], required: [true, 'Register number is required!'] },
    nationality: { type: String },
    languages: { type: [String] },
    status: { type: String, required: [true, 'Status is required!'] },
    lastVotedYear: { type: Number, default: null }
});

module.exports = mongoose.model('Student', StudentSchema);