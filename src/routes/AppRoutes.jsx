import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperAdminLogin from "../pages/SuperAdminLogin";
import CreateSchoolAdmin from "../pages/CreateSchoolAdmin";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SuperAdminLogin />} />
        <Route path="/createschooladmin" element={<CreateSchoolAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
