import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'superadmin' | 'vendor' | 'user';

export interface UserData {
  email: string;
  fullName?: string;
  designation?: string;
}

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  isLoading: boolean;
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
  setUser: () => {},
  isAuthenticated: false,
  logout: () => {},
  isLoading: true
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

const STORAGE_KEY = 'mistock_user';
const ROLE_KEY = 'mistock_role';
const INDUSTRY_KEY = 'mistock_industry';
const COMPANY_NAME_KEY = 'mistock_company_name';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [companyName, setCompanyName] = useState('Mistock HQ');
  const [userRole, setUserRole] = useState<UserRole>('superadmin');
  const [user, setUserState] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user, role, industry, and company name from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      const storedRole = localStorage.getItem(ROLE_KEY);
      const storedIndustry = localStorage.getItem(INDUSTRY_KEY);
      const storedCompanyName = localStorage.getItem(COMPANY_NAME_KEY);
      
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
        if (storedRole) {
          setUserRole(storedRole as UserRole);
        }
      }
      
      if (storedIndustry) {
        setSelectedIndustry(storedIndustry);
      }
      
      if (storedCompanyName) {
        setCompanyName(storedCompanyName);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const setUser = (userData: UserData | null) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const logout = () => {
    setUserState(null);
    setUserRole('user');
    setSelectedIndustry('');
    setCompanyName('Mistock HQ');
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(INDUSTRY_KEY);
    localStorage.removeItem(COMPANY_NAME_KEY);
    // Clear cookies if any
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  };

  const isAuthenticated = user !== null;

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        selectedIndustry,
        setSelectedIndustry: (industry) => {
          setSelectedIndustry(industry);
          localStorage.setItem(INDUSTRY_KEY, industry);
        },
        companyName,
        setCompanyName: (name) => {
          setCompanyName(name);
          localStorage.setItem(COMPANY_NAME_KEY, name);
        },
        userRole,
        setUserRole: (role) => {
          setUserRole(role);
          localStorage.setItem(ROLE_KEY, role);
        },
        user,
        setUser,
        isAuthenticated,
        logout,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};