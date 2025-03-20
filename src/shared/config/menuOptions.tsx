import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const menuOptions = [
  {
    title: "Overview",
    subtitle: "Apps and Widgets",
    items: [
      {
        id: "dashboard",
        text: "Dashboard",
        path: "/",
        icon: <DashboardIcon />,
      },
      {
        id: "settings",
        text: "Settings",
        icon: <AdminPanelSettingsIcon />,
        subItems: [
          {
            id: "profile",
            text: "Profile",
            path: "/settings/profile",
            icon: <AccountBoxIcon />,
          },
          {
            id: "account",
            text: "Account",
            path: "/settings/account",
            icon: <AdminPanelSettingsIcon />,
          },
        ],
      },
    ],
  },
];
