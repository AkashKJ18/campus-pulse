import https from "../config/api-config";

export const createRole = async (data) => {
    const result = await https.post('/roles/create', data);
    return result;
};

export const updateRole = async (id, data) => {
    const result = await https.put(`/roles/update/${id}`, data);
    return result;
};

export const getRoles = async () => {
    const result = await https.get('/roles/list');
    return result;
};

export const getRole = async (id) => {
    const result = await https.get(`/roles/list/${id}`);
    return result;
};

export const deleteRole = async (id) => {
    const result = await https.delete(`/roles/delete/${id}`);
    return result;
};