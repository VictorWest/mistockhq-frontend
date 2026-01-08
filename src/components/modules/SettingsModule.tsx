import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Save, Shield } from 'lucide-react';

const SettingsModule: React.FC = () => {
    const { companyName, userRole } = useAppContext();
    const { toast } = useToast();

    // Initialize state from loading default or local storage
    const [paystackPublicKey, setPaystackPublicKey] = useState(() => {
        return localStorage.getItem('paystackPublicKey') || 'pk_test_xxxxxxxxxxxxxxxxxxxx';
    });
    const [paystackSecretKey, setPaystackSecretKey] = useState(() => {
        return localStorage.getItem('paystackSecretKey') || 'sk_test_xxxxxxxxxxxxxxxxxxxx';
    });

    const handleSavePaymentSettings = () => {
        localStorage.setItem('paystackPublicKey', paystackPublicKey);
        localStorage.setItem('paystackSecretKey', paystackSecretKey);

        toast({
            title: "Settings Saved",
            description: "Paystack configuration has been updated and saved locally.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Settings</h2>
                    <p className="text-muted-foreground">Manage your application preferences</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Basic details about your organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Company Name</Label>
                            <Input value={companyName} disabled />
                            <p className="text-xs text-muted-foreground mt-1">Managed via onboarding/config.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {userRole === 'superadmin' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Shield className="h-5 w-5 mr-2 text-blue-600" />
                            Payment Configuration (Superadmin)
                        </CardTitle>
                        <CardDescription>Configure Paystack payment gateway settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="pk">Paystack Public Key</Label>
                                <Input
                                    id="pk"
                                    type="password"
                                    value={paystackPublicKey}
                                    onChange={(e) => setPaystackPublicKey(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="sk">Paystack Secret Key</Label>
                                <Input
                                    id="sk"
                                    type="password"
                                    value={paystackSecretKey}
                                    onChange={(e) => setPaystackSecretKey(e.target.value)}
                                />
                            </div>
                        </div>
                        <Separator />
                        <Button onClick={handleSavePaymentSettings}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Payment Settings
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default SettingsModule;
