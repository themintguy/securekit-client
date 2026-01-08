import { Routes, Route } from "react-router-dom";
import Vault from "../pages/vault/Vault";
import { ProtectedRoute } from "../context/ProtectedRoute";
import UploadFiles from "../pages/files/UploadFiles";
import Recovery from "../pages/recovery/Recovery";

const ServerRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/vault" element={<ProtectedRoute>  <Vault /></ProtectedRoute>} />
        <Route path="/files" element={<ProtectedRoute>  <UploadFiles /></ProtectedRoute>} />
        <Route path="/recovery" element={<ProtectedRoute>  <Recovery /></ProtectedRoute>} />


      </Routes>
    </>
  );
}

export default ServerRoutes