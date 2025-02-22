import https from "../config/api-config";

export const createStudent = async (data) => {
    const result = await https.post('/students/create', data);
    return result;
};

export const updateStudent = async (id, data) => {
    const result = await https.put(`/students/update/${id}`, data);
    return result;
};

export const getStudents = async () => {
    const result = await https.get('/students/list');
    return result;
};

export const getStudentsDropdownData = async () => {
    const result = await https.get('/students/dropdown');
    return result;
};

export const getStudent = async (id) => {
    const result = await https.get(`/students/list/${id}`);
    return result;
};

export const deleteStudent = async (id) => {
    const result = await https.delete(`/students/delete/${id}`);
    return result;
};