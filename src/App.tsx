import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layouts/Layout";
import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/home/HomePage";
import DocsPage from "./pages/docs/DocsPage";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Routes go here */}
          <Route element={<Layout />}>
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
