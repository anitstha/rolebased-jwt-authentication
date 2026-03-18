import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperAdminLogin from "../pages/SuperAdminLogin";
import CreateSchoolAdmin from "../pages/CreateSchoolAdmin";
import CreateSchoolForm from "../pages/CreateSchoolForm";
import GetSchools from "../pages/GetSchools";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SuperAdminLogin />} />
        <Route path="/create-schoolform" element={<CreateSchoolForm />} />
        <Route path="/create-schooladmin" element={<CreateSchoolAdmin />} />
        <Route path="/get-schools" element={<GetSchools />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
