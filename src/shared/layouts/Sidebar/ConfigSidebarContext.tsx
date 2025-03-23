import { createContext, useContext, useState } from 'react';

interface ConfigSidebarContextType {
  isConfigSidebarOpen: boolean;
  toggleConfigSidebar: () => void;
}

const ConfigSidebarContext = createContext<ConfigSidebarContextType | undefined>(undefined);

export const useConfigSidebar = () => {
  const context = useContext(ConfigSidebarContext);
  if (!context) {
    throw new Error('useConfigSidebar must be used within a ConfigSidebarProvider');
  }
  return context;
};

export const ConfigSidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConfigSidebarOpen, setIsConfigSidebarOpen] = useState(false);

  const toggleConfigSidebar = () => {
    setIsConfigSidebarOpen(!isConfigSidebarOpen);
  };

  return (
    <ConfigSidebarContext.Provider value={{ isConfigSidebarOpen, toggleConfigSidebar }}>
      {children}
    </ConfigSidebarContext.Provider>
  );
};
