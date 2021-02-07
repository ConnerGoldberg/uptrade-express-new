import { lazy } from "react";

const Welcome = lazy(() => import("../views/Welcome.jsx"));

const CustomersContainer = lazy(() =>
  import("../components/customers/customers")
);

const ThemeRoutes = [
  {
    state: "welcome",
    path: "/welcome",
    name: "Welcome",
    mini: "W",
    icon: "mdi mdi-view-dashboard",
    component: Welcome,
  },
  {
    state: "customers",
    path: "/customers",
    name: "Customers",
    mini: "W",
    icon: "mdi mdi-view-dashboard",
    component: CustomersContainer,
  },
];

export default ThemeRoutes;
