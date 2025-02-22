import https from "../config/api-config";

export const castVote = async (data) => {
    const result = await https.post('/vote/create', data);
    return result;
};

export const getStats = async () => {
    const result = await https.get('/vote/stats');
    return result;
};