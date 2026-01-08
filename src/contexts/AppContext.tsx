import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'superadmin' | 'vendor' | 'user';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  user?: { email: string; fullName?: string; designation?: string } | null;
  setUser: (user: { email: string; fullName?: string; designation?: string } | null) => void;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  selectedIndustry: '',
  setSelectedIndustry: () => {},
  companyName: 'Mistock HQ',
  setCompanyName: () => {},
  userRole: 'superadmin',
  setUserRole: () => {},
  user: null,
  setUser: () => {}
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [companyName, setCompanyName] = useState('Mistock HQ');
  const [userRole, setUserRole] = useState<UserRole>('superadmin');
  const [user, setUser] = useState<{ email: string; fullName?: string; designation?: string } | null>(null);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        selectedIndustry,
        setSelectedIndustry,
        companyName,
        setCompanyName,
        userRole,
        setUserRole,
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};