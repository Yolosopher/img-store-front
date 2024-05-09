import Header from "@/components/shared/header/Header";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryRenderer from "../error/ErrorBoundaryRenderer";

const Layout = () => {
  return (
    <ErrorBoundary fallbackRender={ErrorBoundaryRenderer}>
      <Header />
      <main>
        <Outlet />
      </main>
    </ErrorBoundary>
  );
};
export default Layout;
