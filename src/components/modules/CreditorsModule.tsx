import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Eye } from 'lucide-react';
import SettlementHistory from '@/components/creditors/SettlementHistory';
import api from '@/lib/api'

interface SettlementRecord {
  id: string;
  amount: number;
  date: string;
  method: 'Cash' | 'POS' | 'Transfer' | 'Cheque';
  reference?: string;
  recordedBy: string;
  notes?: string;
}

interface Creditor {
  id: string;
  supplierName: string;
  originalAmount: number;
  creationDate: string;
  status: 'Unpaid' | 'Partially Paid' | 'Fully Paid';
  settlementHistory: SettlementRecord[];
  remainingBalance: number;
}

import { useAppContext } from '@/contexts/AppContext';

const CreditorsModule: React.FC = () => {
  const { user } = useAppContext();
  const [creditors, setCreditors] = useState<Creditor[]>([]);

  useEffect(() => {
    (async () => {
      if (!user || !user.email) return;
      try {
        const data: any[] = await api.getCreditors(user.email);
        const mapped = (data || []).map((c: any, idx: number) => ({
          id: (c.supplierName || `c-${idx}`),
          supplierName: c.supplierName,
          originalAmount: c.originalAmount || 0,
          creationDate: c.creationDate || '',
          status: (c.status === 'paid') ? 'Fully Paid' : (c.status === 'partially paid' ? 'Partially Paid' : 'Unpaid'),
          settlementHistory: [] as SettlementRecord[],
          remainingBalance: c.remainingBalance !== undefined ? c.remainingBalance : (c.originalAmount || 0)
        }));
        setCreditors(mapped);
      } catch (e) {
        console.error('Failed to fetch creditors', e);
      }
    })();
  }, [user]);

  const [selectedCreditor, setSelectedCreditor] = useState<Creditor | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [isSettling, setIsSettling] = useState(false);
  const [viewingHistory, setViewingHistory] = useState<Creditor | null>(null);

  const getTotalPaid = (creditor: Creditor) => {
    return creditor.settlementHistory.reduce((sum, settlement) => sum + settlement.amount, 0);
  };

  const getRemainingBalance = (creditor: Creditor) => {
    if (creditor.remainingBalance !== undefined) return creditor.remainingBalance;
    return creditor.originalAmount - getTotalPaid(creditor);
  };

  const handleRecordPayment = async () => {
    if (!selectedCreditor || !paymentAmount || !paymentMethod || !user || !user.email) return;

    const amount = parseFloat(paymentAmount);
    const dateStr = new Date().toISOString().split('T')[0];

    // Compute new remaining balance
    const totalPaidSoFar = selectedCreditor.settlementHistory.reduce((sum, s) => sum + s.amount, 0);
    const previousRemaining = selectedCreditor.remainingBalance !== undefined ? selectedCreditor.remainingBalance : (selectedCreditor.originalAmount - totalPaidSoFar);
    const newRemaining = Math.max(0, previousRemaining - amount);

    const statusBackend = newRemaining <= 0 ? 'paid' : 'partially paid';

    try {
      await api.updateCreditor(user.email, selectedCreditor.supplierName, { remainingBalance: newRemaining, status: statusBackend });

      const newSettlement: SettlementRecord = {
        id: Date.now().toString(),
        amount,
        date: dateStr,
        method: paymentMethod as 'Cash' | 'POS' | 'Transfer' | 'Cheque',
        reference: paymentReference || undefined,
        recordedBy: user.fullName || user.email,
        notes: paymentNotes || undefined
      };

      const updatedCreditors = creditors.map(c => {
        if (c.id === selectedCreditor.id) {
          const updatedSettlementHistory = [...c.settlementHistory, newSettlement];

          const newStatus = statusBackend === 'paid' ? 'Fully Paid' : 'Partially Paid';

          return {
            ...c,
            settlementHistory: updatedSettlementHistory,
            status: newStatus as 'Unpaid' | 'Partially Paid' | 'Fully Paid',
            remainingBalance: newRemaining
          };
        }
        return c;
      });

      setCreditors(updatedCreditors);
      setIsSettling(false);
      setPaymentAmount('');
      setPaymentMethod('');
      setPaymentReference('');
      setPaymentNotes('');
      setSelectedCreditor(null);
    } catch (e) {
      console.error('Failed to record payment', e);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Fully Paid':
        return <Badge className="bg-green-100 text-green-800">Fully Paid</Badge>;
      case 'Partially Paid':
        return <Badge className="bg-yellow-100 text-yellow-800">Partially Paid</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-800">Unpaid</Badge>;
    }
  };

  // ... Inside CreditorsModule
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCreditors = creditors.filter(c => {
    const matchesSearch = c.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Creditors Management</h2>
          <p className="text-slate-900">Track and manage outstanding balances owed to suppliers</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Supplier</Label>
              <Input
                id="search"
                placeholder="Search supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-[200px]">
              <Label htmlFor="status">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                  <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                  <SelectItem value="Fully Paid">Fully Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Outstanding Creditors</CardTitle>
          <CardDescription>All outstanding balances owed to suppliers and vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier/Vendor Name</TableHead>
                <TableHead>Original Amount</TableHead>
                <TableHead>Creation Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remaining Balance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCreditors.map((creditor) => (
                <React.Fragment key={creditor.id}>
                  <TableRow>
                    <TableCell className="font-medium">{creditor.supplierName}</TableCell>
                    <TableCell>₦{creditor.originalAmount.toLocaleString()}</TableCell>
                    <TableCell>{creditor.creationDate}</TableCell>
                    <TableCell>{getStatusBadge(creditor.status)}</TableCell>
                    <TableCell className="font-semibold">
                      ₦{getRemainingBalance(creditor).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewingHistory(creditor)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCreditor(creditor);
                            setIsSettling(true);
                          }}
                          disabled={creditor.status === 'Fully Paid'}
                        >
                          <DollarSign className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {viewingHistory?.id === creditor.id && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-0">
                        <SettlementHistory
                          settlements={creditor.settlementHistory}
                          totalAmount={creditor.originalAmount}
                          remainingBalance={getRemainingBalance(creditor)}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={isSettling} onOpenChange={setIsSettling}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Supplier: {selectedCreditor?.supplierName}</Label>
              <p className="text-sm text-slate-900">
                Outstanding Balance: ₦{selectedCreditor ? getRemainingBalance(selectedCreditor).toLocaleString() : 0}
              </p>
            </div>
            <div>
              <Label htmlFor="payment-amount">Payment Amount</Label>
              <Input
                id="payment-amount"
                type="number"
                placeholder="Enter payment amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="POS">POS</SelectItem>
                  <SelectItem value="Transfer">Transfer</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="payment-reference">Reference (Optional)</Label>
              <Input
                id="payment-reference"
                placeholder="Enter reference number"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="payment-notes">Notes (Optional)</Label>
              <Input
                id="payment-notes"
                placeholder="Enter payment notes"
                value={paymentNotes}
                onChange={(e) => setPaymentNotes(e.target.value)}
              />
            </div>
            <Button onClick={handleRecordPayment} className="w-full">
              Record Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreditorsModule;