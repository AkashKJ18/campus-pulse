import https from "../config/api-config";

export const createCandidate = async (data) => {
    const result = await https.post('/candidates/create', data);
    return result;
};

export const updateCandidate = async (id, data) => {
    const result = await https.put(`/candidates/update/${id}`, data);
    return result;
};

export const getCandidates = async () => {
    const result = await https.get('/candidates/list');
    return result;
};

export const getCandidate = async (id) => {
    const result = await https.get(`/candidates/list/${id}`);
    return result;
};

export const deleteCandidate = async (id) => {
    const result = await https.delete(`/candidates/delete/${id}`);
    return result;
};