// components/dashboard/Sidebar/SidebarSection.tsx
import { Typography, Box, List } from "@mui/material";
import { MenuSection } from "./types";
import { SidebarItem } from "./SidebarItem";

interface SidebarSectionProps {
  section: MenuSection;
  isMobile: boolean;
  onClose: () => void;
  openSubmenus: Set<string>;
  onSubmenuToggle: (id: string) => void;
}

export const SidebarSection = ({
  section,
  isMobile,
  onClose,
  openSubmenus,
  onSubmenuToggle,
}: SidebarSectionProps) => (
  <div key={section.title}>
    <Box sx={{ px: 2, py: 1 }}>
      <Typography variant="subtitle2" fontWeight="bold">
        {section.title}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {section.subtitle}
      </Typography>
    </Box>
    <List>
      {section.items.map((item) => (
        <SidebarItem
          key={item.id}
          item={item}
          isMobile={isMobile}
          onClose={onClose}
          isOpen={openSubmenus.has(item.id)}
          onToggle={() => onSubmenuToggle(item.id)}
          hasSubItems={!!item.subItems} // Add this prop
        />
      ))}
    </List>
  </div>
);
