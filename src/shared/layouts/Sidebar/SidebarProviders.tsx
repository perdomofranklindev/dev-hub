'use client';

import { ReactNode } from 'react';
import { SidebarProvider } from './SidebarContext';
import { SubmenuProvider } from './SubmenuContext';

interface SidebarProvidersProps {
  children: ReactNode;
}

/**
 * Combined provider that wraps both sidebar and submenu providers
 * This makes it easier to set up all required providers at once
 */
export const SidebarProviders = ({ children }: SidebarProvidersProps) => {
  return (
    <SidebarProvider>
      <SubmenuProvider>{children}</SubmenuProvider>
    </SidebarProvider>
  );
};

// Export all hooks for convenience
export { useSidebar } from './SidebarContext';
export { useSubmenu } from './SubmenuContext';
