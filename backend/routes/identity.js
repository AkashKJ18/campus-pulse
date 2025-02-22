const express = require("express");
const router = express.Router();
const Identity = require("../models/identity.js");
const authenticateToken = require('./authorize-token.js');
const cacheMiddleware = require('../middleware/cache.js');

router.post('/create', authenticateToken, async (req, res) => {
    try {
        const newIdentity = new Identity(req.body);
        await newIdentity.save();
        res.status(201).send(newIdentity);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const identity = await Identity.findByIdAndUpdate(id, req.body, { new: true });
        if (!identity) {
            return res.status(404).send({ message: "Identity not found" });
        }
        res.send(identity);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list', authenticateToken, cacheMiddleware('identity, 3600'), async (req, res) => {
    try {
        const identities = await Identity.find();
        res.send(identities);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const identity = await Identity.findById(id);
        if (!identity) {
            return res.status(404).send({ message: "Identity not found" });
        }
        res.send(identity);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const identity = await Identity.findByIdAndDelete(id);
        if (!identity) {
            return res.status(404).send({ message: "Identity not found" });
        }
        res.send(identity);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;