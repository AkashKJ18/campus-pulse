import https from "../config/api-config";

export const sendOtp = async (data) => {
    const result = await https.post('/auth/send-otp', data);
    return result;
};

export const verifyOtp = async (data) => {
    const result = await https.post('/auth/verify-otp', data);
    return result;
};