import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit2, Users } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

// Simple mock interface for local state since we don't have a backend
interface Worker {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
}

const WorkerManagementModule = () => {
    const { userRole } = useAppContext();
    // In a real app, fetch this from API. Here we use local state initialized with some mock data or empty.
    const [workers, setWorkers] = useState<Worker[]>([
        {
            id: '1',
            name: 'John Doe',
            role: 'Logistics Manager',
            bio: 'Oversees all shipping and receiving operations.',
            image: 'https://github.com/shadcn.png'
        }
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentWorker, setCurrentWorker] = useState<Partial<Worker>>({});

    // Only vendors (and superadmin) should see this
    if (userRole !== 'vendor' && userRole !== 'superadmin') {
        return (
            <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                    You do not have permission to view this module.
                </CardContent>
            </Card>
        );
    }

    const handleSaveWorker = () => {
        if (!currentWorker.name || !currentWorker.role) return;

        if (currentWorker.id) {
            // Edit
            setWorkers(prev => prev.map(w => w.id === currentWorker.id ? { ...w, ...currentWorker } as Worker : w));
        } else {
            // Add
            const newWorker: Worker = {
                id: Math.random().toString(36).substr(2, 9),
                name: currentWorker.name,
                role: currentWorker.role,
                bio: currentWorker.bio || '',
                image: currentWorker.image || 'https://github.com/shadcn.png'
            };
            setWorkers(prev => [...prev, newWorker]);
        }
        setIsDialogOpen(false);
        setCurrentWorker({});
    };

    const handleDelete = (id: string) => {
        setWorkers(prev => prev.filter(w => w.id !== id));
    };

    const openEdit = (worker: Worker) => {
        setCurrentWorker(worker);
        setIsDialogOpen(true);
    };

    const openAdd = () => {
        setCurrentWorker({});
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Team Management</h2>
                    <p className="text-muted-foreground">Manage your team members and their public profiles.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openAdd}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Worker
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{currentWorker.id ? 'Edit Worker' : 'Add New Worker'}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input
                                    value={currentWorker.name || ''}
                                    onChange={e => setCurrentWorker(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g. Sarah Connor"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Role / Title</Label>
                                <Input
                                    value={currentWorker.role || ''}
                                    onChange={e => setCurrentWorker(prev => ({ ...prev, role: e.target.value }))}
                                    placeholder="e.g. Head of Security"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Bio</Label>
                                <Textarea
                                    value={currentWorker.bio || ''}
                                    onChange={e => setCurrentWorker(prev => ({ ...prev, bio: e.target.value }))}
                                    placeholder="Brief description of responsibilities..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Avatar URL</Label>
                                <Input
                                    value={currentWorker.image || ''}
                                    onChange={e => setCurrentWorker(prev => ({ ...prev, image: e.target.value }))}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSaveWorker}>Save Member</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workers.map(worker => (
                    <Card key={worker.id} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center gap-4 bg-slate-50 border-b border-slate-100">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                <AvatarImage src={worker.image} />
                                <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-base">{worker.name}</CardTitle>
                                <CardDescription>{worker.role}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <p className="text-sm text-slate-600 mb-4 h-12 line-clamp-2">
                                {worker.bio}
                            </p>
                            <div className="flex gap-2 justify-end">
                                <Button variant="ghost" size="sm" onClick={() => openEdit(worker)}>
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(worker.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default WorkerManagementModule;
