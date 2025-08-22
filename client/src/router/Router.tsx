import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

//LAYOUTS
const MainLayout = lazy(() => import("@/components/layout/MainLayout"));

//PAGES
const Home = lazy(() => import("@/app/HomePage"));
const Login = lazy(() => import("@/app/(auth)/Login"));
const Dashboard = lazy(() => import("@/app/(authenticated)/Dashboard"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default Router;
