var express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate.js');
const authenticateToken = require('./authorize-token.js');
const cacheMiddleware = require('../middleware/cache.js');

router.post('/create', authenticateToken, async (req, res) => {
    try {
        const newCandidate = new Candidate(req.body);
        await newCandidate.save();
        res.status(201).send(newCandidate);
    } catch (error) {
        res.status(400).send(error);
    };
});

router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const candidate = await Candidate.findByIdAndUpdate(id, req.body, { new: true });
        if (!candidate) {
            return res.status(404).send({ message: "Candidate not found" });
        }
        res.send(candidate);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list', authenticateToken, cacheMiddleware('candidates', 3600), async (req, res) => {
    try {
        const candidates = await Candidate.find()
            .populate('student', 'firstName lastName dateOfBirth grade section course registerNumber')
            .exec();
        res.send(candidates);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).send({ message: "Candidate not found" });
        }
        res.send(candidate);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const candidate = await Candidate.findByIdAndDelete(id);
        if (!candidate) {
            return res.status(404).send({ message: "Candidate not found" });
        }
        res.send(candidate);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;