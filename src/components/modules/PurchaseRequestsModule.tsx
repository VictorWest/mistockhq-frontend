import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePurchaseContext } from '@/contexts/PurchaseContext';
import { Lock, Unlock, DollarSign, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PurchaseRequestsModule: React.FC = () => {
    const { requests, updateRequestStatus, updateRequestCharges } = usePurchaseContext();
    const { toast } = useToast();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [chargeAmount, setChargeAmount] = useState<number>(0);

    const handleUnlock = (id: string) => {
        updateRequestStatus(id, 'unlocked');
        toast({
            title: "Payment Unlocked",
            description: "User can now proceed to payment.",
        });
    };

    const handleSaveCharges = (id: string) => {
        updateRequestCharges(id, chargeAmount);
        setEditingId(null);
        toast({
            title: "Charges Updated",
            description: "Additional charges have been applied.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Purchase Requests</h2>
                    <p className="text-muted-foreground">Manage user purchase requests and unlock payments</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Incoming Requests ({requests.length})</CardTitle>
                    <CardDescription>Review items, set charges, and unlock functionality.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Request ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Subtotal</TableHead>
                                <TableHead>Charges</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                        No purchase requests found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                requests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell className="font-mono">{request.id}</TableCell>
                                        <TableCell>{request.customerName || 'Guest'}</TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {request.items.map((i, idx) => (
                                                    <span key={idx} className="block">{i.quantity}x {i.name}</span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>₦{request.subtotal.toFixed(2)}</TableCell>
                                        <TableCell>
                                            {editingId === request.id ? (
                                                <div className="flex items-center space-x-2">
                                                    <Input
                                                        type="number"
                                                        className="w-20 h-8"
                                                        value={chargeAmount}
                                                        onChange={(e) => setChargeAmount(Number(e.target.value))}
                                                    />
                                                    <Button size="sm" onClick={() => handleSaveCharges(request.id)}>Save</Button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded" onClick={() => { setEditingId(request.id); setChargeAmount(request.charges); }}>
                                                    <span>₦{request.charges.toFixed(2)}</span>
                                                    <DollarSign className="h-3 w-3 text-gray-400" />
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-bold">₦{(request.subtotal + request.charges).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                request.status === 'unlocked' ? 'default' :
                                                    request.status === 'paid' ? 'secondary' : 'outline'
                                            }>
                                                {request.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {request.status === 'pending' && (
                                                <Button size="sm" onClick={() => handleUnlock(request.id)} className="bg-yellow-600 hover:bg-yellow-700">
                                                    <Unlock className="h-4 w-4 mr-2" />
                                                    Unlock Payment
                                                </Button>
                                            )}
                                            {request.status === 'unlocked' && (
                                                <span className="text-sm text-green-600 flex items-center">
                                                    <CheckCircle className="h-4 w-4 mr-1" /> Awaiting Pay
                                                </span>
                                            )}
                                            {request.status === 'completed' && (
                                                <span className="text-sm text-gray-500">Completed</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default PurchaseRequestsModule;
