import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, AlertCircle, CheckCircle, Ban } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

// Mock reported vendors data
const MOCK_REPORTS = [
    {
        id: 'r1',
        vendorName: 'Bad Quality Corp',
        reporter: 'John Doe',
        reason: 'Consistently poor quality items sent vs description.',
        status: 'pending',
        date: '2024-03-15'
    },
    {
        id: 'r2',
        vendorName: 'Late Shippers Ltd',
        reporter: 'Jane Smith',
        reason: 'Orders are always 2 weeks late.',
        status: 'pending',
        date: '2024-03-14'
    },
    {
        id: 'r3',
        vendorName: 'Scammy Supplies',
        reporter: 'Mike Johnson',
        reason: 'Asked for payment outside of platform.',
        status: 'resolved',
        date: '2024-03-10'
    }
];

const ReportedVendorsModule = () => {
    const { userRole } = useAppContext();
    const [reports, setReports] = useState(MOCK_REPORTS);

    if (userRole !== 'superadmin') {
        return (
            <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6 text-center text-red-600 flex flex-col items-center">
                    <AlertTriangle className="h-12 w-12 mb-4" />
                    <h3 className="text-lg font-bold">Access Denied</h3>
                    <p>Only Superadmins can view this module.</p>
                </CardContent>
            </Card>
        );
    }

    const handleAction = (id: string, action: 'ban' | 'dismiss') => {
        setReports(prev => prev.map(report =>
            report.id === id
                ? { ...report, status: action === 'ban' ? 'banned' : 'dismissed' }
                : report
        ));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Reported Vendors</h2>
                    <p className="text-muted-foreground">Review and take action on vendor reports.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Active Reports</CardTitle>
                    <CardDescription>Vendors flagged by community members</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Reported By</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-medium">{report.vendorName}</TableCell>
                                    <TableCell>{report.reporter}</TableCell>
                                    <TableCell className="max-w-xs truncate" title={report.reason}>{report.reason}</TableCell>
                                    <TableCell>{report.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={report.status === 'pending' ? 'destructive' : 'secondary'}>
                                            {report.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {report.status === 'pending' && (
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline" onClick={() => handleAction(report.id, 'dismiss')}>
                                                    Dismiss
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleAction(report.id, 'ban')}>
                                                    <Ban className="h-4 w-4 mr-1" /> Ban
                                                </Button>
                                            </div>
                                        )}
                                        {report.status !== 'pending' && (
                                            <span className="text-sm text-muted-foreground capitalize">
                                                {report.status}
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReportedVendorsModule;
