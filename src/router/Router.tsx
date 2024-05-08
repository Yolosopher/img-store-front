import LoginPage from "@/pages/auth/login/LoginPage";
import RegisterPage from "@/pages/auth/register/RegisterPage";
import DocsPage from "@/pages/docs/DocsPage";
import ImagesPage from "@/pages/images/ImagesPage";
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
          <Route path="/tokens" element={<TokensPage />} />
          <Route path="/images" element={<ImagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default Router;
