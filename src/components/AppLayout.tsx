import React, { useState } from 'react';
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

const AppLayout: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [activeModule, setActiveModule] = useState('inventory');
  const [companyName, setCompanyName] = useState('Mistock HQ');

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    setShowOnboarding(false);
    setCompanyName(`${industry.charAt(0).toUpperCase() + industry.slice(1)} Company`);
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