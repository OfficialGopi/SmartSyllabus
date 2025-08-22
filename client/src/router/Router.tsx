import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

//LAYOUTS
const MainLayout = lazy(() => import("@/components/layout/MainLayout"));

//PAGES
const Home = lazy(() => import("@/app/HomePage"));
const CheckAuthStatus = lazy(() => import("@/app/CheckAuthStatus"));
const Login = lazy(() => import("@/app/(auth)/Login"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/check-auth-status" element={<CheckAuthStatus />} />
      <Route element={<MainLayout />}>
        <Route path="/chats" element={<></>} />
        <Route path="/roadmaps" element={<></>} />
        <Route path="/progress" element={<></>} />
        <Route path="/profile" element={<></>} />
      </Route>
    </Routes>
  );
};

export default Router;
