const mongoose = require('mongoose');
const VoteSchema = mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', unique: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
    year: { type: Number, default: new Date().getFullYear() }
});

module.exports = mongoose.model('Vote', VoteSchema);