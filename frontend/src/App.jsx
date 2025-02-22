import { useEffect } from 'react';
import { setupInterceptors } from './config/api-config';
import AuthProvider from './context/auth-provider';
import { useNotification } from './context/notification-context';
import { AdminLayout } from './layout/admin-layout';

function App() {
  const { showNotification } = useNotification();

  useEffect(() => {
    setupInterceptors(showNotification);
  }, [showNotification]);

  return (
    <AuthProvider>
      <AdminLayout />
    </AuthProvider>
  );
}

export default App;
