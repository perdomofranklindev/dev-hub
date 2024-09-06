import { Routes, RoutesAsType } from "@dev-hub/shared/routes";

export enum NavItemOption {
  Group = "Group",
  Item = "Item",
  Collapse = "Collapse",
}

export type NavItemOptionType = `${NavItemOption}`;

export type NavItemType = {
  id: string;
  title: string;
  subtitle?: string;
  icon?: JSX.Element;
  path?: Routes | RoutesAsType;
  type?: NavItemOptionType | NavItemOption;
  children?: NavItemType[];
  disabled?: boolean;
  active?: boolean;
  hasPermission?: boolean;
};
