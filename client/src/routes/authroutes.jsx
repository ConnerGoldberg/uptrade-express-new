import { lazy } from "react";
const Login = lazy(() => import("../views/authentication/login/login"));
const Register = lazy(() => import("../views/authentication/signup/register"));

const authRoutes = [
  { path: "/authentication/login", name: "Login", component: Login },
  { path: "/authentication/register", name: "Register", component: Register },
];
export default authRoutes;
