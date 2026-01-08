import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIndustryFeatures } from '@/hooks/useIndustryConfig';
import { useAppContext } from '@/contexts/AppContext';
import HospitalitySalesInterface from '@/components/sales/HospitalitySalesInterface';
import DirectSalesInterface from '@/components/sales/DirectSalesInterface';
import PaymentModal from '@/components/sales/PaymentModal';
import SalesReports from '@/components/sales/SalesReports';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Receipt, BarChart3, CheckCircle, CreditCard } from 'lucide-react';
import { usePurchaseContext } from '@/contexts/PurchaseContext';

interface SaleItem {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  status: 'active' | 'voided' | 'cancelled' | 'complimentary';
  discount?: number;
  reason?: string;
}

interface Sale {
  id: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  total: number;
  table?: string;
  waiter?: string;
  customer?: string;
  status: 'pending' | 'completed' | 'voided';
  paymentMethod?: string;
  timestamp: Date;
}

const SalesModule: React.FC = () => {
  const industryFeatures = useIndustryFeatures();
  const { selectedDepartment, selectedIndustry, userRole } = useAppContext();
  const { createRequest, requests, updateRequestStatus } = usePurchaseContext();
  const [currentSale, setCurrentSale] = useState<Sale>({
    id: `SALE-${Date.now()}`,
    items: [],
    subtotal: 0,
    discount: 0,
    total: 0,
    status: 'pending',
    timestamp: new Date()
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('sales');
  const [salesHistory, setSalesHistory] = useState<Sale[]>([]);

  const isCustomerFacing = selectedDepartment?.isCustomerFacing ?? true;
  const isHospitalityIndustry = selectedIndustry === 'hospitality';

  if (!industryFeatures.hasSellingPrice || !isCustomerFacing) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-6">
          <CardContent className="text-center">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Sales Module Not Available</h3>
            <p className="text-muted-foreground">
              {!industryFeatures.hasSellingPrice
                ? 'This module is not enabled for your industry configuration.'
                : 'This department is not configured for customer-facing sales.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const addItem = (item: any) => {
    const existingItem = currentSale.items.find(i => i.id === item.id);

    if (existingItem && existingItem.status === 'active') {
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      const newItem: SaleItem = {
        id: item.id,
        sku: item.sku || item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        total: item.price,
        status: 'active'
      };

      const updatedItems = [...currentSale.items, newItem];
      updateSale(updatedItems);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    const updatedItems = currentSale.items.map(item =>
      item.id === itemId && item.status === 'active'
        ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
        : item
    );

    updateSale(updatedItems);
  };

  const removeItem = (itemId: string) => {
    const updatedItems = currentSale.items.filter(item => item.id !== itemId);
    updateSale(updatedItems);
  };

  const updateSale = (items: SaleItem[]) => {
    const activeItems = items.filter(item => item.status === 'active');
    const subtotal = activeItems.reduce((sum, item) => sum + item.total, 0);
    const total = subtotal - currentSale.discount;

    setCurrentSale({
      ...currentSale,
      items,
      subtotal,
      total: Math.max(0, total)
    });
  };

  const handleItemAction = (itemId: string, action: string, reason?: string) => {
    const updatedItems = currentSale.items.map(item =>
      item.id === itemId
        ? { ...item, status: action as any, reason }
        : item
    );

    updateSale(updatedItems);
  };

  const handlePayment = (paymentData: any) => {
    const completedSale: Sale = {
      ...currentSale,
      status: 'completed',
      paymentMethod: paymentData.method
    };

    handleSaleComplete(completedSale);

    if (paymentData.printReceipt) {
      console.log('Printing receipt...');
    }

    resetSale();
  };

  const handleSaleComplete = (sale: Sale) => {
    setSalesHistory(prev => [sale, ...prev]);
    console.log('Sale completed:', sale);
  };

  const resetSale = () => {
    setCurrentSale({
      id: `SALE-${Date.now()}`,
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      status: 'pending',
      timestamp: new Date()
    });
  };

  const renderPurchaseButton = () => {
    const existingRequest = requests.find(r => r.id === currentSale.id);

    if (!existingRequest) {
      return (
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            createRequest({
              id: currentSale.id,
              items: currentSale.items,
              subtotal: currentSale.subtotal,
              total: currentSale.total,
              customerName: currentSale.customer
            });
          }}
          disabled={currentSale.items.filter(i => i.status === 'active').length === 0}
        >
          <Receipt className="mr-2 h-4 w-4" />
          Request Purchase
        </Button>
      );
    }

    if (existingRequest.status === 'pending') {
      return (
        <Button className="w-full" disabled variant="secondary">
          <CheckCircle className="mr-2 h-4 w-4" />
          Request Pending Approval
        </Button>
      );
    }

    if (existingRequest.status === 'unlocked') {
      return (
        <div className="space-y-2">
          <div className="text-sm bg-green-50 p-2 text-green-700 rounded border border-green-200">
            <strong>Payment Unlocked!</strong><br />
            Includes Charges: ₦{existingRequest.charges.toFixed(2)}<br />
            <strong>Total to Pay: ₦{(existingRequest.subtotal + existingRequest.charges).toFixed(2)}</strong>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => {
            updateRequestStatus(existingRequest.id, 'paid');
            handlePayment({ method: 'Paystack', printReceipt: true });
          }}>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay with Paystack
          </Button>
        </div>
      );
    }

    return (
      <Button className="w-full" disabled variant="outline">
        Sale Completed
      </Button>
    );
  };

  // Render hospitality-specific interface for hospitality industry
  if (isHospitalityIndustry && industryFeatures.hasTableService) {
    return (
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="sales">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Sales
            </TabsTrigger>
            <TabsTrigger value="reports">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales">
            <HospitalitySalesInterface onSaleComplete={handleSaleComplete} />
          </TabsContent>

          <TabsContent value="reports">
            <SalesReports department={selectedDepartment?.name} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Standard sales interface for non-hospitality industries
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Sales Point</h2>
          <p className="text-muted-foreground">
            Sale ID: {currentSale.id}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={currentSale.status === 'pending' ? 'default' : 'secondary'}>
            {currentSale.status.toUpperCase()}
          </Badge>
          <Badge variant="outline">
            {currentSale.items.filter(i => i.status === 'active').length} Items
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sales">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DirectSalesInterface
                items={currentSale.items}
                onAddItem={addItem}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                onItemAction={handleItemAction}
              />
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Sale Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₦{currentSale.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Discount:</span>
                      <span>-₦{currentSale.discount.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>₦{currentSale.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {userRole === 'user' ? (
                      (() => {
                        const existingRequest = requests.find(r => r.id === currentSale.id);
                        return (
                          <>
                            {!existingRequest ? (
                              <Button
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                onClick={() => {
                                  createRequest({
                                    id: currentSale.id,
                                    items: currentSale.items,
                                    subtotal: currentSale.subtotal,
                                    total: currentSale.total,
                                    customerName: currentSale.customer
                                  });
                                }}
                                disabled={currentSale.items.filter(i => i.status === 'active').length === 0}
                              >
                                <Receipt className="mr-2 h-4 w-4" />
                                Request Purchase
                              </Button>
                            ) : existingRequest.status === 'pending' ? (
                              <Button className="w-full" disabled variant="secondary">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Request Pending Approval
                              </Button>
                            ) : existingRequest.status === 'unlocked' ? (
                              <div className="space-y-2">
                                <div className="text-sm bg-green-50 p-2 text-green-700 rounded border border-green-200">
                                  <strong>Payment Unlocked!</strong><br />
                                  Includes Charges: ₦{existingRequest.charges.toFixed(2)}<br />
                                  <strong>Total to Pay: ₦{(existingRequest.subtotal + existingRequest.charges).toFixed(2)}</strong>
                                </div>
                                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => {
                                  updateRequestStatus(existingRequest.id, 'paid');
                                  handlePayment({ method: 'Paystack', printReceipt: true });
                                }}>
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Pay with Paystack
                                </Button>
                              </div>
                            ) : (
                              <Button className="w-full" disabled variant="outline">
                                Sale Completed
                              </Button>
                            )}
                          </>
                        );
                      })()
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => setIsPaymentModalOpen(true)}
                        disabled={currentSale.items.filter(i => i.status === 'active').length === 0}
                      >
                        <Receipt className="mr-2 h-4 w-4" />
                        Process Payment (POS)
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={resetSale}
                      disabled={currentSale.items.length === 0}
                    >
                      Clear Sale
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <SalesReports department={selectedDepartment?.name} />
        </TabsContent>
      </Tabs>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPayment={handlePayment}
        saleData={{
          subtotal: currentSale.subtotal,
          discount: currentSale.discount,
          total: currentSale.total,
          items: currentSale.items
        }}
      />
    </div>
  );
};

export default SalesModule;