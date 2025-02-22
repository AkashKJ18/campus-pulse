const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const authenticateToken = require('./authorize-token.js');
const cacheMiddleware = require('../middleware/cache.js');

router.post('/create', authenticateToken, async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).send(newEvent);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!event) {
            return res.status(404).send({ message: "Event not found" });
        }
        res.send(event);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list', authenticateToken, cacheMiddleware('events', 3600), async (req, res) => {
    const role = req.user.role;
    try {
        let events;
        if (role === 'Student') {
            events = await Event.find({ isPublished: true });
        } else {
            events = await Event.find();
        }
        res.send(events);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).send({ message: "Event not found" });
        }
        res.send(event);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).send({ message: "Event not found" });
        }
        res.send(event);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
