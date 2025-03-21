export interface MenuItem {
  id: string;
  text: string;
  path?: string;
  icon?: React.ReactNode;
  subItems?: SubMenuItem[];
}

export interface SubMenuItem extends Omit<MenuItem, "subItems"> {
  parentId?: string;
}

export interface MenuSection {
  id: string;
  title?: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  drawerWidth: number;
  isMobile: boolean;
}
