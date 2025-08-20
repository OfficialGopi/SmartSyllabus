import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/app/HomePage"));
const Login = lazy(() => import("@/app/Login"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
