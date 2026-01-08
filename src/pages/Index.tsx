
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { AppProvider } from '@/contexts/AppContext';

const Index: React.FC = () => {
  return (
    <AppProvider>
      <PurchaseProvider>
        <AppLayout />
      </PurchaseProvider>
    </AppProvider>
  );
};
import { PurchaseProvider } from '@/contexts/PurchaseContext';

export default Index;
