const express = require("express");
const axios = require("axios");
const router = express.Router();
const jwt = require('jsonwebtoken');
const OTPStore = require("../models/otp-store.js");
const Identity = require('../models/identity.js');
const User = require('../models/user.js');
const Student = require('../models/student.js');
const Role = require('../models/role.js');

router.post('/send-otp', async (req, res) => {
    try {
        const mobile = req.body.mobile;
        const identity = await Identity.findOne({ phoneNumber: mobile });

        if (!identity) {
            return res.status(404).json({ success: false, message: "Identity not found" });
        }
        const randomOTP = Math.floor(100000 + Math.random() * 900000);
        // await axios.post('https://www.fast2sms.com/dev/bulkV2', null, {
        //     headers: { authorization: process.env.FAST2SMS_API_KEY },
        //     params: {
        //         variables_values: randomOTP,
        //         route: 'otp',
        //         numbers: mobile
        //     }
        // });
        await OTPStore.findOneAndUpdate(
            { phone: mobile },
            { otp: randomOTP },
            { upsert: true, new: true }
        );
        res.json({ success: true, message: 'OTP sent successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to send OTP.' });
    }
});

router.post('/verify-otp', async (req, res) => {
    try {
        const { mobile, otp } = req.body;
        // const otpRecord = await OTPStore.findOne({ phone: mobile });

        // if (!otpRecord) {
        //     return res.status(400).json({ success: false, message: "OTP expired or not found" });
        // }

        // if (otpRecord.otp !== parseInt(otp)) {
        //     return res.status(400).json({ success: false, message: "Invalid OTP" });
        // }

        const identity = await Identity.findOne({ phoneNumber: mobile }).populate({
            path: 'role _id',
            populate: { path: 'permissions', select: 'name -_id' }
        }).exec();

        let data;
        if (identity.role.name === 'Admin' || identity.role.name === 'Teacher') {
            data = await User.findOne({ identity: identity._id })
        } else if (identity.role.name === 'Student') {
            data = await Student.findOne({ identity: identity._id })
        }

        const permissions = identity.role.permissions.map(p => p.name);
        const payload = {
            profile: data,
            role: identity.role.name,
            permissions
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        await OTPStore.deleteOne({ phone: mobile });
        res.status(200).json({ success: true, message: 'OTP verified successfully!', token, identity });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to verify OTP." });
    }
});

module.exports = router;