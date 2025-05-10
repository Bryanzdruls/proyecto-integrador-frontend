import PrivateRoute from "./PrivateRoute"
import LogIn from "../auth/pages/LogIn"
import { Route,  Routes, useNavigate } from 'react-router';
import SignIn from "../auth/pages/SignIn";
import DashboardLayoutBasic from "../layout/DashboardLayout";
import ReportsForm from "../reports/pages/ReportsForm";
import UserListPage from "../users/pages/UserListPage";
import EventListPage from "../events/pages/EventListPage";
import { useEffect } from "react";
import ReportListPage from "../reports/pages/ReportsListPage";

export const AppRouter = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/dashboard/reports");
    }

  }, [token]);
  return (
    <Routes>
      <Route path="auth">
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<SignIn />} />
      </Route>


      <Route path="dashboard/*" element={<PrivateRoute />}>
        <Route element={<DashboardLayoutBasic/>}>
          <Route path="reports" element={<ReportsForm />} />
          <Route path="manage-reports" element={<ReportListPage />}/>
          <Route path="users" element={<UserListPage />} />
          <Route path="events" element={<EventListPage />} />
        </Route>
      </Route>
    </Routes>    
  )
}
