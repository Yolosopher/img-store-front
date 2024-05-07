import authStore from "@/stores/authStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const authInfo = authStore((state) => state.authInfo);

  if (!authInfo) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
export default ProtectedLayout;
