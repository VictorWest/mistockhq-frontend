import React, { useState, useEffect } from 'react';
import OnboardingModal from './OnboardingModal';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import InventoryModule from './modules/InventoryModule';
import DepartmentsModule from './modules/DepartmentsModule';
import SalesModule from './modules/SalesModule';
import VendorsModule from './modules/VendorsModule';
import ReportsModule from './modules/ReportsModule';
import ReceivablesModule from './modules/ReceivablesModule';
import CreditorsModule from './modules/CreditorsModule';
import UserManagementModule from './modules/UserManagementModule';
import ProcurementModule from './modules/ProcurementModule';
import CostCalculationModule from './modules/CostCalculationModule';
import SubscriptionModule from './modules/SubscriptionModule';
import PurchaseRequestsModule from './modules/PurchaseRequestsModule';
import SettingsModule from './modules/SettingsModule';
import WorkerManagementModule from './modules/WorkerManagementModule';
import ReportedVendorsModule from './modules/ReportedVendorsModule';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/contexts/AppContext';
import api from '@/lib/api';

const AppLayout: React.FC = () => {
  const { selectedIndustry, setSelectedIndustry, setCompanyName, companyName, user, isAuthenticated } = useAppContext();
  const [activeModule, setActiveModule] = useState('inventory');
  const [showOnboarding, setShowOnboarding] = useState(!selectedIndustry && isAuthenticated);
  const [isSaving, setIsSaving] = useState(false);

  // Update modal visibility when selectedIndustry or auth status changes
  useEffect(() => {
    setShowOnboarding(!selectedIndustry && isAuthenticated);
  }, [selectedIndustry, isAuthenticated]);

  const handleIndustrySelect = async (industry: string) => {
    setIsSaving(true);
    try {
      // Update in database
      if (user?.email) {
        await api.updateIndustry(user.email, industry);
      }
      
      // Update in context (saves to localStorage)
      setSelectedIndustry(industry);
      setCompanyName(`${industry.charAt(0).toUpperCase() + industry.slice(1)} Company`);
      setShowOnboarding(false);
    } catch (error) {
      console.error('Failed to update industry:', error);
      alert('Failed to save industry selection. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'inventory':
        return <InventoryModule />;
      case 'departments':
        return <DepartmentsModule />;
      case 'sales':
        return <SalesModule />;
      case 'vendors':
        return <VendorsModule />;
      case 'receivables':
        return <ReceivablesModule />;
      case 'creditors':
        return <CreditorsModule />;
      case 'procurement':
        return <ProcurementModule />;
      case 'user-management':
        return <UserManagementModule />;
      case 'cost-calculation':
        return <CostCalculationModule />;
      case 'reports':
        return <ReportsModule />;
      case 'subscription':
        return <SubscriptionModule />;
      case 'purchase-requests':
        return <PurchaseRequestsModule />;
      case 'team':
        return <WorkerManagementModule />;
      case 'reported-vendors':
        return <ReportedVendorsModule />;
      case 'settings':
        return <SettingsModule />;
      case 'upgrade':
        return <SubscriptionModule />;
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-slate-900">Welcome to Mistock HQ. Select a module from the sidebar to get started.</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:16px_16px]">
      <OnboardingModal
        isOpen={showOnboarding}
        onIndustrySelect={handleIndustrySelect}
        isLoading={isSaving}
      />

      <div className="flex h-screen">
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader
            companyName={companyName}
            industry={selectedIndustry || 'General'}
            planType="Free Trial"
          />

          <main className="flex-1 overflow-y-auto p-6">
            {renderModule()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;