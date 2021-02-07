import { lazy } from "react";

// const ListDiscountClassifications = lazy(() =>
//   import("../admin-views/discountClassification/ListDiscountClassifications")
// );

const CustomersContainer = lazy(() =>
  import("../components/customers/customers")
);

const AdminThemeRoutes = [
  {
    collapse: true,
    visible: false,
    state: "dashboard",
    path: "/admin/dashboard",
    name: "Filters",
    mini: "B",
    permissions: "basic_admin",
    roles: "super_admin",
    icon: "mdi mdi-view-dashboard",
    component: CustomersContainer,
    // child: [
    //   {
    //     path: "/customers",
    //     name: "Customers",
    //     mini: "B",
    //     icon: "mdi mdi-adjust",
    //     component: CustomersContainer,
    //     exact: true,
    //   },
    //]
  },
];

export default AdminThemeRoutes;
