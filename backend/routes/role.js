const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const authenticateToken = require('./authorize-token.js');
const cacheMiddleware = require('../middleware/cache.js');

router.post('/create', authenticateToken, async (req, res) => {
    try {
        const newRole = new Role(req.body);
        await newRole.save();
        res.status(201).send(newRole);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findByIdAndUpdate(id, req.body, { new: true });
        if (!role) {
            return res.status(404).send({ message: "Role not found" });
        }
        res.send(role);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list', authenticateToken, cacheMiddleware('role', 3600), async (req, res) => {
    try {
        const roles = await Role.find().populate('permissions', 'name').exec();
        res.send(roles);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).send({ message: "Role not found" });
        }
        res.send(role);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findByIdAndDelete(id);
        if (!role) {
            return res.status(404).send({ message: "Role not found" });
        }
        res.send(role);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
