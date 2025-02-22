import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

    const closeSnackbar = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {
                notification && (
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={notification.open}
                        onClose={closeSnackbar}
                        autoHideDuration={3000}
                    >
                        <Alert severity={notification.severity} variant="filled">
                            {notification.message}
                        </Alert>
                    </Snackbar>
                )
            }
        </NotificationContext.Provider>
    );
};
