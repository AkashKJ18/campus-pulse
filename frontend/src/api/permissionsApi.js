import https from "../config/api-config";

export const getPermissions = async () => {
    const result = await https.get('/permissions/list');
    return result;
};