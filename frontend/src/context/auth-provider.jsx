import { createContext, useContext, useEffect, useState } from "react";
import { verifyOtp } from "../api/authApi";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);

            setIsAuthenticated(true);
            setUser({
                profile: decoded.profile,
                role: decoded.role,
                permissions: decoded.permissions || [],
            });
        }
    }, [token]);

    const login = async (data) => {
        try {
            const result = await verifyOtp(data);
            if (result.status === 200) {
                if (result.data && result.data.identity && result.data.token) {
                    setUser(result.data.identity);
                    setToken(result.data.token);
                    setIsAuthenticated(true);
                    const { role, ...rest } = result.data.identity;
                    const { permissions, ...filteredRole } = role;
                    localStorage.setItem('user', JSON.stringify({ ...rest, role: filteredRole }));
                    localStorage.setItem('token', result.data.token);
                } else {
                    console.error("Response data is missing expected fields.");
                }
                return;
            }
            throw new Error(result.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken("");
        setIsAuthenticated(false);
        localStorage.clear();
    };

    return <AuthContext.Provider value={{ login, logout, user, isAuthenticated, token }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};