import https from "../config/api-config";

export const createUser = async (data) => {
    const result = await https.post('/users/create', data);
    return result;
};

export const updateUser = async (id, data) => {
    const result = await https.put(`/users/update/${id}`, data);
    return result;
};

export const getUsers = async () => {
    const result = await https.get('/users/list');
    return result;
};

export const getUser = async (id) => {
    const result = await https.get(`/users/list/${id}`);
    return result;
};

export const deleteUser = async (id) => {
    const result = await https.delete(`/users/delete/${id}`);
    return result;
};