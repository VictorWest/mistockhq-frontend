import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingBag, Store, ArrowRight, Package, Filter } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_VENDORS, Product } from '@/data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const uniqueCategories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));

const StocksPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const navigate = useNavigate();

    const filteredProducts = MOCK_PRODUCTS.filter(product => {
        const vendor = MOCK_VENDORS.find(v => v.id === product.vendorId);
        const vendorName = vendor ? vendor.name.toLowerCase() : '';
        const searchLower = searchQuery.toLowerCase();

        const matchesSearch = product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            vendorName.includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower);

        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const handleRequestItem = () => {
        // Simple auth check simulation 
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

        if (!isAuthenticated) {
            if (window.confirm("You need to be logged in to request items. Would you like to log in now?")) {
                navigate('/login');
            }
            return;
        }

        alert(`Request sent for ${selectedProduct?.name}!`);
        setSelectedProduct(null);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 py-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-xl mb-4">
                        <ShoppingBag className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Global Marketplace</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Browse thousands of products from our verified vendor network.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Search & Filter */}
                <div className="max-w-3xl mx-auto mb-12 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            className="pl-12 h-14 text-lg shadow-sm border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl bg-white"
                            placeholder="Search products, categories, or vendors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full md:w-64 h-14 rounded-xl border-slate-200 shadow-sm bg-white text-lg">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-slate-500" />
                                <SelectValue placeholder="All Categories" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                            <SelectItem value="all">All Categories</SelectItem>
                            {uniqueCategories.map(category => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => {
                            const vendor = MOCK_VENDORS.find(v => v.id === product.vendorId);
                            return (
                                <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200">
                                    <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors z-10" />
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <Badge className="absolute top-3 left-3 bg-white/90 text-slate-900 hover:bg-white shadow-sm">
                                            {product.category}
                                        </Badge>
                                    </div>
                                    <CardHeader className="p-4 pb-2">
                                        <div className="flex justify-between items-start gap-2 mb-1">
                                            <h3 className="font-bold text-slate-900 line-clamp-1 text-lg group-hover:text-blue-600 transition-colors">
                                                {product.name}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-slate-500 line-clamp-2 h-10">
                                            {product.description}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <div className="flex items-end justify-between mt-2">
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">Price</p>
                                                <p className="text-2xl font-bold text-slate-900">${product.price.toLocaleString()}</p>
                                            </div>
                                            <div className={`px-2 py-1 rounded text-xs font-bold ${product.stockLevel > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {product.stockLevel > 0 ? `${product.stockLevel} in stock` : 'Out of stock'}
                                            </div>
                                        </div>

                                        {vendor && (
                                            <div className="mt-4 pt-4 border-t border-slate-100">
                                                <p className="text-xs text-slate-400 mb-1">Sold by</p>
                                                <Link
                                                    to={`/vendors?vendorId=${vendor.id}`}
                                                    className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                                                >
                                                    <Store className="h-4 w-4" />
                                                    {vendor.name}
                                                </Link>
                                            </div>
                                        )}
                                    </CardContent>
                                    <CardFooter className="p-4 bg-slate-50 border-t border-slate-100">
                                        <Button
                                            className="w-full bg-white text-slate-900 border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            View Details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                We couldn't find any products matching your search criteria. Try adjusting your filters.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Product Details Dialog */}
            <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
                <DialogContent className="sm:max-w-[600px] overflow-hidden p-0">
                    {selectedProduct && (
                        <>
                            <div className="relative h-64 bg-slate-100">
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-white/90 text-slate-900 hover:bg-white shadow-sm">
                                        {selectedProduct.category}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-6">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-slate-900">{selectedProduct.name}</DialogTitle>
                                    <DialogDescription className="text-base text-slate-600 mt-2">
                                        {selectedProduct.description}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid grid-cols-2 gap-4 my-6">
                                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-sm text-slate-500 mb-1">Price</p>
                                        <p className="text-2xl font-bold text-slate-900">${selectedProduct.price.toLocaleString()}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-sm text-slate-500 mb-1">Stock Status</p>
                                        <div className={`inline-flex items-center px-2 py-1 rounded text-sm font-bold ${selectedProduct.stockLevel > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {selectedProduct.stockLevel > 0 ? `${selectedProduct.stockLevel} Available` : 'Out of Stock'}
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2">
                                    <Button variant="outline" onClick={() => setSelectedProduct(null)} className="w-full sm:w-auto mt-2 sm:mt-0">
                                        Close
                                    </Button>
                                    {selectedProduct.stockLevel > 0 && (
                                        <Button
                                            onClick={handleRequestItem}
                                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            Request Item
                                        </Button>
                                    )}
                                </DialogFooter>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default StocksPage;
