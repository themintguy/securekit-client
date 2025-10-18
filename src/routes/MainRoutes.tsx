import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import Vault from '../pages/Vault';
import About from '../pages/About';
import Error from '../Error';
import Files from '../pages/Files';
import Setting from '../pages/Setting';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/about" element={<About />} />
        <Route path="/files" element={<Files />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default MainRoutes