import { Routes } from "@dev-hub/shared/routes/routes";
import { NavItemOption, NavItemType } from "./sidebar-types";

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
      },
    ],
  },
];
