import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

//LAYOUTS
const MainLayout = lazy(() => import("@/components/layout/MainLayout"));

//PAGES
const Home = lazy(() => import("@/app/HomePage"));
const Login = lazy(() => import("@/app/(auth)/Login"));
const Chats = lazy(() => import("@/app/(authenticated)/Chats"));
const Roadmaps = lazy(() => import("@/app/(authenticated)/Roadmaps"));
const Progress = lazy(() => import("@/app/(authenticated)/Progress"));
const Profile = lazy(() => import("@/app/(authenticated)/Profile"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/chats" element={<Chats />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Router;
