const mongoose = require('mongoose');
const CandidateSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Student is required!'],
        unique: true,
        ref: 'Student'
    },
    votes: { type: Number, default: 0 },
    profilePic: { type: String },
    description: { type: String, required: [true, 'Description is required!'] }
});

module.exports = mongoose.model('Candidate', CandidateSchema);