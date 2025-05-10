import { Navigate, Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getCurrentUserService } from "../reports/services/GetCurrentUserService";

export const PrivateRoute = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("session");

    if (!token || !email) {
      setRole(null);
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        const response = await getCurrentUserService();
        setRole(response?.data.role ?? null);
      } catch {
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!role)    return <Navigate to="/auth/login" replace />;

  // usuarios no-admin solo pueden /dashboard/reports
  if (role !== "ADMIN" && location.pathname !== "/dashboard/reports") {
    return <Navigate to="/dashboard/reports" replace />;
  }

  // aquí “inyectamos” el role en el contexto del Outlet
  return <Outlet context={{ role }} />;
};

export default PrivateRoute;
