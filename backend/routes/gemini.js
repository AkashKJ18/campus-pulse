const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require("express");
const router = express.Router();
require('dotenv').config();
const authenticateToken = require('./authorize-token.js');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig
});

router.post('/generateAIContent', authenticateToken, async (req, res) => {
    try {
        const { messages } = req.body;
        const formattedPrompt = messages.map(msg =>
            `${msg.sender === "user" ? "User" : ""} ${msg.text}`
        ).join("\n");
        const result = await model.generateContent(formattedPrompt);
        const responsedText = result.response.text();
        res.status(201).send(responsedText);
    } catch (error) {
        console.log(error);
    }
});

module.exports = { router, model };
