import FullLayout from "../layouts/fulllayout.jsx";
import BlankLayout from "../layouts/blanklayout.jsx";
import AdminLayout from "../layouts/adminlayout.jsx";
import ContractorLayout from "../layouts/contractorlayout.jsx";
import ClientLayout from "../layouts/clientlayout.jsx";

var indexRoutes = [
  { path: "/authentication", name: "Authentication", component: BlankLayout },
  { path: "/admin", name: "Admin Portal", component: AdminLayout },
  {
    path: "/contractor",
    name: "Contractor Portal",
    component: ContractorLayout,
  },
  { path: "/client", name: "Client Portal", component: ClientLayout },
  { path: "/", name: "Dashboard", component: FullLayout },
];

export { indexRoutes };
