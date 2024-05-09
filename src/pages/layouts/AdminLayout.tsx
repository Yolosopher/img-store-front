import authStore from "@/stores/authStore";
import { Role } from "@/types";
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const authInfo = authStore((state) => state.authInfo!);

  if (![Role.ADMIN, Role.SUPER_ADMIN].includes(authInfo.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
export default AdminLayout;
