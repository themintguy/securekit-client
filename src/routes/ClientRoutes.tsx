import { Route,  Routes } from "react-router-dom";
import About from "../pages/about/About";
import Homepage from "../pages/home/Homepage";
import Login from "../pages/auth/Login";
import Sign from "../pages/auth/Sign";

const ClientRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />


        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
      </Routes>
    </>
  );
}

export default ClientRoutes