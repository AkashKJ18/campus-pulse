const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Identity = require("../models/identity.js");
const authenticateToken = require('./authorize-token.js');
const cacheMiddleware = require('../middleware/cache.js');

router.post('/create', authenticateToken, async (req, res) => {
    try {
        const { phoneNumber, email, role, status } = req.body;
        const existingUser = await Identity.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'Phone number already in use' });
        }

        const newIdentity = new Identity({
            phoneNumber,
            email,
            role,
            status
        });
        await newIdentity.save();

        const newUser = new User({
            ...req.body,
            identity: newIdentity._id
        });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        Object.assign(user, req.body);
        await user.save();

        const { phoneNumber, email, role, status } = req.body;
        if (phoneNumber || email || role || status) {
            const updatedIdentity = await Identity.findById(user.identity);
            if (!updatedIdentity) {
                return res.status(404).send({ message: "Identity not found" });
            }

            updatedIdentity.phoneNumber = phoneNumber || updatedIdentity.phoneNumber;
            updatedIdentity.email = email || updatedIdentity.email;
            updatedIdentity.role = role || updatedIdentity.role;
            updatedIdentity.status = status || updatedIdentity.status;

            await updatedIdentity.save();
        }

        res.send(user);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list', authenticateToken, cacheMiddleware('users', 3600), async (req, res) => {
    try {
        const users = await User.find().populate('role', 'name').exec();
        res.send(users);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        await Identity.findByIdAndDelete(user.identity);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;