import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Search, Filter, ArrowRight, X, User, MapPin, Phone, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import api from '@/lib/api'
import { useSearchParams } from 'react-router-dom';

type VendorType = { vendorId: string, vendorName: string, category?: string, description?: string, images?: string[], contact?: any }

const VendorPage = () => {
    const [vendors, setVendors] = useState<VendorType[]>([])
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedVendor, setSelectedVendor] = useState<VendorType | null>(null);
    const [vendorItems, setVendorItems] = useState<any[]>([])
    const [searchParams, setSearchParams] = useSearchParams();

    const CATEGORIES = Array.from(new Set(vendors.map(v => v.category || 'general')));

    useEffect(() => {
        (async () => {
            try {
                const res: any = await api.listVendorsPublic()
                setVendors(res)
            } catch (e) {
                console.error('Failed to fetch vendors', e)
            }
        })()
    }, [])

    useEffect(() => {
        const vendorId = searchParams.get('vendorId');
        if (vendorId) {
            const vendor = vendors.find(v => v.vendorId === vendorId);
            if (vendor) {
                setSelectedVendor(vendor);
                (async () => {
                    try {
                        const items: any = await api.getVendorItems(vendor.vendorId)
                        setVendorItems(items)
                    } catch (e) {
                        console.error('Failed to fetch vendor items', e)
                        setVendorItems([])
                    }
                })()
            }
        }
    }, [searchParams, vendors]);

    const handleVendorClick = (vendor: VendorType) => {
        setSelectedVendor(vendor);
        setSearchParams({ vendorId: vendor.vendorId });
    };

    const handleCloseDialog = () => {
        setSelectedVendor(null);
        setSearchParams({});
    }

    const filteredVendors = vendors.filter(vendor => {
        const name = (vendor.vendorName || '').toLowerCase()
        const desc = (vendor.description || '').toLowerCase()
        const matchesSearch = name.includes(searchQuery.toLowerCase()) || desc.includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(vendor.category || 'general');
        return matchesSearch && matchesCategory;
    });

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const vendorProducts = selectedVendor
        ? vendorItems
        : [];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-slate-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Trusted Vendor Application</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Explore our curated network of vetted suppliers. Quality, reliability, and speed guaranteed.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
                <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            className="pl-10 h-12 text-lg"
                            placeholder="Search vendors by name or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-12 px-6 flex-1 md:flex-none relative">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filters
                                    {selectedCategories.length > 0 && (
                                        <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-blue-600 text-white rounded-full text-[10px]">
                                            {selectedCategories.length}
                                        </Badge>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {CATEGORIES.map(category => (
                                    <DropdownMenuCheckboxItem
                                        key={category}
                                        checked={selectedCategories.includes(category)}
                                        onCheckedChange={() => toggleCategory(category)}
                                    >
                                        {category}
                                    </DropdownMenuCheckboxItem>
                                ))}
                                {selectedCategories.length > 0 && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-600 justify-center font-medium focus:text-red-600 focus:bg-red-50"
                                            onClick={() => setSelectedCategories([])}
                                        >
                                            Clear Filters
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700 flex-1 md:flex-none">Search</Button>
                    </div>
                </div>

                {/* Active Filters Display */}
                {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {selectedCategories.map(cat => (
                            <Badge key={cat} variant="secondary" className="pl-3 pr-1 py-1 h-8 text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                                {cat}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 ml-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600"
                                    onClick={() => toggleCategory(cat)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        ))}
                        <Button
                            variant="link"
                            className="text-sm text-slate-500 hover:text-slate-900 px-2 h-8"
                            onClick={() => setSelectedCategories([])}
                        >
                            Clear all
                        </Button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVendors.length > 0 ? (
                        filteredVendors.map((vendor) => (
                            <Card
                                key={vendor.vendorId}
                                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-none ring-1 ring-slate-200 bg-white cursor-pointer"
                                onClick={() => handleVendorClick(vendor)}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                                    <img src={(vendor.images && vendor.images[0]) || '/placeholder-300x200.png'} alt={vendor.vendorName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <Badge className="absolute top-4 left-4 z-20 bg-white/90 text-slate-900 hover:bg-white">{vendor.category}</Badge>
                                </div>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{vendor.vendorName}</h3>
                                        <div className="flex items-center bg-yellow-50 text-yellow-600 px-2 py-1 rounded text-sm font-bold">
                                            <Star className="h-3 w-3 fill-current mr-1" />
                                            {vendor.metadata?.rating || '—'}
                                        </div>
                                    </div>
                                    <CardDescription className="text-slate-500 line-clamp-2 h-10">{vendor.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {(vendor.metadata?.tags || []).map((tag: string) => (
                                            <span key={tag} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">{tag}</span>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white transition-colors group-hover:shadow-lg">
                                        View Profile <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-8 w-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No vendors found</h3>
                            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategories([]);
                                }}
                            >
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Vendor Profile Dialog */}
            <Dialog open={!!selectedVendor} onOpenChange={(open) => !open && handleCloseDialog()}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    {selectedVendor && (
                        <>
                            <DialogHeader>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-1/3">
                                        <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 mb-4">
                                            <img src={(selectedVendor.images && selectedVendor.images[0]) || '/placeholder-300x200.png'} alt={selectedVendor.vendorName} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex text-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(selectedVendor.metadata?.rating || 0) ? 'fill-current' : 'text-slate-300'}`} />
                                                ))}
                                            </div>
                                            <span className="text-sm font-medium text-slate-600">({selectedVendor.metadata?.rating || '—'})</span>
                                        </div>
                                        <div className="space-y-2 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-slate-400" />
                                                {selectedVendor.contact?.address || 'Location varies'}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-slate-400" />
                                                {selectedVendor.contact?.email ? 'Hidden for privacy' : 'Email hidden'}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-slate-400" />
                                                {selectedVendor.contact?.phone ? 'Hidden for privacy' : 'Phone hidden'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-2/3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge>{selectedVendor.category}</Badge>
                                            {(selectedVendor.metadata?.tags || []).map((tag: string) => (
                                                <Badge key={tag} variant="outline">{tag}</Badge>
                                            ))}
                                        </div>
                                        <DialogTitle className="text-3xl font-bold mb-2">{selectedVendor.vendorName}</DialogTitle>
                                        <DialogDescription className="text-lg leading-relaxed mb-6">
                                            {selectedVendor.description}
                                        </DialogDescription>

                                        <div className="border-t pt-6">
                                            <h3 className="text-xl font-bold mb-4">Available Items</h3>
                                            {vendorProducts.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {vendorProducts.map(product => (
                                                        <div key={product.itemId} className="flex gap-3 p-3 rounded-lg border bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                                            <div className="h-16 w-16 rounded-md overflow-hidden bg-white shrink-0 border">
                                                                <img src={(product.images && product.images[0]) || '/placeholder-80x80.png'} alt={product.name} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-medium text-slate-900 truncate">{product.name}</h4>
                                                                <p className="text-sm text-slate-500 line-clamp-1">{product.location || ''}</p>
                                                                <div className="flex items-center justify-between mt-1">
                                                                    <span className="font-bold text-slate-900">${product.price?.toLocaleString() || '—'}</span>
                                                                    <span className={`text-xs px-1.5 py-0.5 rounded ${product.stockLevel > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                        {product.stockLevel > 0 ? 'In Stock' : 'Out of Stock'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg">
                                                    No items currently listed.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </DialogHeader>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default VendorPage;

