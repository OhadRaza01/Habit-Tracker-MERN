import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/me`,
                    {
                        withCredentials: true,
                    }
                );

                setUser(response.data.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getCurrentUser();
    }, []);

    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {}, { withCredentials: true });
        } catch {
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);