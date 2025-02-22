const express = require('express');
const router = express.Router();
const Vote = require("../models/vote.js");
const Student = require("../models/student.js");
const Candidate = require("../models/candidate.js");
const { model } = require("./gemini.js");
const authenticateToken = require('./authorize-token.js');

router.post('/create', authenticateToken, async (req, res) => {
    const { studentId, candidateId } = req.body;
    const currentYear = new Date().getFullYear();

    try {
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Check if the student has already voted this year
        if (student.lastVotedYear === currentYear) {
            return res.status(400).json({ message: "You have already voted this year!" });
        }

        await Vote.create({ studentId, candidateId, year: currentYear });
        await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });
        await Student.findByIdAndUpdate(studentId, { lastVotedYear: currentYear });
        return res.status(200).json({ message: "Vote cast successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/stats', authenticateToken, async (req, res) => {
    try {
        const totalVotes = await Vote.countDocuments();
        const totalStudents = await Student.countDocuments();
        const voterParticipation = ((totalVotes / totalStudents) * 100).toFixed(2);

        const candidates = await Candidate.find().sort({ votes: -1 }).select("student votes").populate('student', 'firstName lastName');
        const expectedFinalVotes = Math.round((totalVotes / (voterParticipation / 100)) || totalVotes);

        const prompt = `
            Given the following election data:
            - Total Students: ${totalStudents}
            - Total Votes Cast: ${totalVotes}
            - Voter Participation: ${voterParticipation}%
            - Expected Total Votes: ${expectedFinalVotes}
            - Candidates: ${candidates.map((item) => item)}
            
            Based on these numbers, predict the possible outcome of the election. 
            Who is likely to win? How might the remaining votes distribute? Provide insights on possible trends.
            Along with analysis, provide some charts (Bar, Pie only) data
            Use Candidates info from Candidates
            Provide detailed analytics in below format, always give more than 1 results as array of objects always:
            {
                "summary": "",
                "chart_type": "",
                "data": []
            }
            JSON language
        `;

        const aiResponse = await model.generateContent(prompt);
        const aiPrediction = aiResponse.response.text();

        res.json({
            totalVotes,
            totalStudents,
            voterParticipation,
            candidates,
            aiPrediction
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching dashboard data" });
    }
});

module.exports = router;