import https from "../config/api-config";

export const createEvent = async (data) => {
    const result = await https.post('/events/create', data);
    return result;
};

export const updateEvent = async (id, data) => {
    const result = await https.put(`/events/update/${id}`, data);
    return result;
};

export const getEvents = async () => {
    const result = await https.get('/events/list');
    return result;
};

export const getEvent = async (id) => {
    const result = await https.get(`/events/list/${id}`);
    return result;
};

export const deleteEvent = async (id) => {
    const result = await https.delete(`/events/delete/${id}`);
    return result;
};