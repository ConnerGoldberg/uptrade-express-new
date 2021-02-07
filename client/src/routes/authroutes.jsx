import { lazy } from "react";
const Login = lazy(() => import("./../views/authentication/login/login"));

const authRoutes = [
  { path: "/authentication/login", name: "Login", component: Login },
];
export default authRoutes;
