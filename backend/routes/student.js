var express = require('express');
const router = express.Router();
const Student = require('../models/student.js');
const Role = require('../models/role.js');
const Identity = require("../models/identity.js");
const authenticateToken = require('./authorize-token.js');
const cacheMiddleware = require('../middleware/cache.js');

router.post('/create', authenticateToken, async (req, res) => {
    try {
        const { phoneNumber, email } = req.body;

        const existingStudent = await Identity.findOne({ phoneNumber });
        const studentRole = await Role.findOne({ name: "Student" });
        if (existingStudent) {
            return res.status(400).json({ message: 'Phone number already in use' });
        }

        const newIdentity = new Identity({
            phoneNumber,
            email,
            role: studentRole._id,
            status: 'Active'
        });
        await newIdentity.save();

        const newStudent = new Student({
            ...req.body,
            identity: newIdentity._id
        });
        await newStudent.save();
        res.status(201).send(newStudent);
    } catch (error) {
        res.status(400).send(error)
    };
});

router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        Object.assign(student, req.body);
        await student.save();

        const { phoneNumber, email, status } = req.body;
        if (phoneNumber || email || status) {
            const updatedIdentity = await Identity.findById(student.identity);
            if (!updatedIdentity) {
                return res.status(404).send({ message: "Identity not found" });
            }

            updatedIdentity.phoneNumber = phoneNumber || updatedIdentity.phoneNumber;
            updatedIdentity.email = email || updatedIdentity.email;
            updatedIdentity.status = status || updatedIdentity.status;

            await updatedIdentity.save();
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list', authenticateToken, cacheMiddleware('students', 3600), async (req, res) => {
    try {
        const students = await Student.find().populate('identity');
        res.send(students);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/dropdown', authenticateToken, async (req, res) => {
    try {
        const students = await Student.find({}, '_id firstName lastName registerNumber');
        const formattedStudents = students.map((student) => ({
            _id: student._id,
            fullName: `${student.firstName} ${student.lastName} : ${student.registerNumber}`
        }));
        res.send(formattedStudents);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/list/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        await Identity.findByIdAndDelete(student.identity);
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;