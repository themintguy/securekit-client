import MainRoutes from './routes/MainRoutes';
import { AuthProvider } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <MainRoutes />
    </AuthProvider>
  );
};

export default App;
