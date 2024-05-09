import DashboardPage from "@/pages/admin/dashboard/DashboardPage";
import UsersPage from "@/pages/admin/users/UsersPage";
import LoginPage from "@/pages/auth/login/LoginPage";
import RegisterPage from "@/pages/auth/register/RegisterPage";
import DocsPage from "@/pages/docs/DocsPage";
import ErrorPage from "@/pages/error/ErrorPage";
import ImagesPage from "@/pages/images/ImagesPage";
import AdminLayout from "@/pages/layouts/AdminLayout";
import Layout from "@/pages/layouts/Layout";
import ProtectedLayout from "@/pages/layouts/ProtectedLayout";
import ProfilePage from "@/pages/profile/ProfilePage";
import TokensPage from "@/pages/tokens/TokensPage";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      {/* Routes go here */}
      <Route element={<Layout />}>
        <Route path="/" element={<DocsPage />} />
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="tokens" element={<TokensPage />} />
          <Route path="images" element={<ImagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<UsersPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <div
              style={{
                height: "calc(100dvh - 7rem)",
              }}
            >
              <ErrorPage
                title="Page not found"
                code={404}
                description="The page you are looking for does not exist."
              />
            </div>
          }
        />
      </Route>
    </Routes>
  );
};
export default Router;
