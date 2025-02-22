export const hasPermission = (role, permission) => {
    if (role && role.permissions && Array.isArray(role.permissions)) {
        return role.permissions.some((perm) => perm.name === permission)
    }
    return false;
};
