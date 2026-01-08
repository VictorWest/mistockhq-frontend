import React, { createContext, useContext, useState } from 'react';

export interface PurchaseRequest {
    id: string;
    items: any[];
    subtotal: number;
    total: number;
    status: 'pending' | 'unlocked' | 'paid' | 'completed';
    timestamp: Date;
    customerName?: string;
    charges: number;
}

interface PurchaseContextType {
    requests: PurchaseRequest[];
    createRequest: (request: Omit<PurchaseRequest, 'status' | 'timestamp' | 'charges'>) => void;
    updateRequestStatus: (id: string, status: PurchaseRequest['status']) => void;
    updateRequestCharges: (id: string, charges: number) => void;
}

const PurchaseContext = createContext<PurchaseContextType>({
    requests: [],
    createRequest: () => { },
    updateRequestStatus: () => { },
    updateRequestCharges: () => { },
});

export const usePurchaseContext = () => useContext(PurchaseContext);

export const PurchaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [requests, setRequests] = useState<PurchaseRequest[]>([]);

    const createRequest = (requestData: Omit<PurchaseRequest, 'status' | 'timestamp' | 'charges'>) => {
        const newRequest: PurchaseRequest = {
            ...requestData,
            status: 'pending',
            timestamp: new Date(),
            charges: 0,
        };
        setRequests(prev => [newRequest, ...prev]);
    };

    const updateRequestStatus = (id: string, status: PurchaseRequest['status']) => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status } : req
        ));
    };

    const updateRequestCharges = (id: string, charges: number) => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, charges, total: req.subtotal + charges } : req
        ));
    };

    return (
        <PurchaseContext.Provider
            value={{
                requests,
                createRequest,
                updateRequestStatus,
                updateRequestCharges,
            }}
        >
            {children}
        </PurchaseContext.Provider>
    );
};
