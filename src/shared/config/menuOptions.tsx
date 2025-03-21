import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

//? DISCLAIMER: WE RECOMMEND UNTIL 3 LEVELS OF NESTED MENU ITEMS.

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

          },
          {
            id: "account",
            text: "Account",
            subItems: [
              {
                id: "account",
                text: "Account",
                path: "/settings/account",
              },
            ]
          },
        ],
      },
    ],
  },
];
