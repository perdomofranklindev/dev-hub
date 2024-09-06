import { Routes } from "@dev-hub/shared/routes";
import { NavItemOption, NavItemType } from "./sidebar-types";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";

export const SIDEBAR_ITEMS: NavItemType[] = [
  {
    id: "components",
    title: "Components",
    subtitle: "Useful components collected",
    type: NavItemOption.Group,
    children: [
      {
        id: "rich-text-editors",
        title: "Rich Text Editors",
        path: Routes.RichTextEditors,
        type: NavItemOption.Item,
        icon: <WysiwygIcon />
      },
    ],
  },
];
