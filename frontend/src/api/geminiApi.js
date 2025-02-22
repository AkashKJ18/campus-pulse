import https from "../config/api-config";

export const generateContent = async (data) => {
    const result = await https.post('/gemini/generateAIContent', { messages: data });
    return result;
};