import { useState } from "react";
import { generateContent } from "../../api/geminiApi";
import { Button, Box, Paper, Stack, Typography, TextField } from "@mui/material";
import { ChatBox, TypingOverlay } from "./styled";
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const handleGenerate = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        const updatedMessages = [...messages, userMessage].slice(-10);
        setMessages(updatedMessages);
        setIsTyping(true);

        try {
            const result = await generateContent(updatedMessages);
            const aiMessage = { text: result.data, sender: "ai" };
            setMessages((prev) => [...prev.slice(-9), aiMessage]);
        } catch (error) {
            console.error("Error generating content:", error);
        }

        setIsTyping(false);
        setInput("");
    };

    return (
        <ChatBox>
            <Paper elevation={1}>
                {messages.length === 0 ? (
                    <Typography variant="body1" textAlign="center" color="gray">
                        Start the conversation...
                    </Typography>
                ) : (
                    messages.map((msg, index) => (
                        <Box key={index} sx={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-start" : "flex-end" }}>
                            <Paper
                                sx={{
                                    maxWidth: "70%",
                                    backgroundColor: msg.sender === "user" ? "#e3f2fd" : "#c8e6c9"
                                }}
                            >
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </Paper>
                        </Box>
                    ))
                )}
            </Paper>
            {isTyping && (
                <TypingOverlay>AI is typing...</TypingOverlay>
            )}
            <Stack direction="row" spacing={2} mt={2}>
                <TextField
                    label="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    fullWidth
                />
                <Button variant="contained" onClick={handleGenerate}>
                    Send
                </Button>
            </Stack>
        </ChatBox>
    );
};

export default ChatBot;
