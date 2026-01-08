import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const PublicLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-blue-100 selection:text-blue-900">
            {/* Navbar */}
            <nav className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 border-b",
                isHome ? "bg-slate-950/80 backdrop-blur-md border-slate-800 text-white" : "bg-white/80 backdrop-blur-md border-slate-200 text-slate-900"
            )}>
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-white p-0.5">
                            <img src="/logo.jpg" alt="Mistock HQ" className="w-full h-full object-contain" />
                        </div>
                        <span className={cn(
                            "text-xl font-bold tracking-tight",
                            isHome ? "text-white" : "text-slate-900"
                        )}>
                            Mistock <span className="text-blue-500">HQ</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Vendors', path: '/vendors' },
                            { name: 'Stocks', path: '/stocks' },
                            { name: 'Services', path: '/services' },
                            { name: 'About', path: '/about' },
                            { name: 'Contact', path: '/contact' }
                        ].map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-opacity-10",
                                    isHome
                                        ? "text-slate-300 hover:text-white hover:bg-white"
                                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="flex items-center space-x-3 ml-6">
                            <Link to="/login" className={cn(
                                "text-sm font-medium transition-colors",
                                isHome ? "text-white hover:text-blue-400" : "text-slate-900 hover:text-blue-600"
                            )}>Login</Link>
                            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                                <Link to="/register">Get Started</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={cn("md:hidden p-2 rounded-lg transition-colors", isHome ? "hover:bg-slate-800" : "hover:bg-slate-100")}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <div className="md:hidden border-t bg-white dark:bg-slate-950 p-6 space-y-4 absolute w-full shadow-xl animate-fade-in-down text-slate-900">
                        <div className="grid gap-4">
                            <Link to="/" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link to="/vendors" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Vendors</Link>
                            <Link to="/stocks" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Stocks</Link>
                            <Link to="/services" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Services</Link>
                            <Link to="/about" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                            <Link to="/contact" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                        </div>
                        <div className="pt-6 border-t border-slate-100 grid gap-3">
                            <Button asChild variant="outline" className="w-full justify-center">
                                <Link to="/login">Log in</Link>
                            </Button>
                            <Button asChild className="w-full justify-center bg-blue-600">
                                <Link to="/register">Get Started Free</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400 py-16 lg:py-24 border-t border-slate-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-white rounded flex items-center justify-center p-1">
                                    <img src="/logo.jpg" alt="Mistock HQ" className="w-full h-full object-contain" />
                                </div>
                                <span className="text-xl font-bold text-white">Mistock HQ</span>
                            </Link>
                            <p className="text-sm leading-relaxed max-w-xs">
                                Empowering modern businesses with intelligent inventory solutions and a connected global marketplace.
                            </p>
                            <div className="flex space-x-4 pt-2">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                                        <Icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-lg mb-6">Platform</h3>
                            <ul className="space-y-4 text-sm">
                                <li><Link to="/vendors" className="hover:text-blue-400 transition-colors flex items-center group"><ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Vendor Network</Link></li>
                                <li><Link to="/services" className="hover:text-blue-400 transition-colors flex items-center group"><ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Features & Services</Link></li>
                                <li><Link to="/login" className="hover:text-blue-400 transition-colors flex items-center group"><ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Enterprise Portal</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-lg mb-6">Support</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start"><MapPin className="w-4 h-4 mr-3 mt-1 text-slate-500" /> 123 Innovation Drive, Tech City, CA</li>
                                <li className="flex items-center"><Mail className="w-4 h-4 mr-3 text-slate-500" /> support@mistockhq.com</li>
                                <li className="flex items-center"><Phone className="w-4 h-4 mr-3 text-slate-500" /> +1 (888) 123-4567</li>
                                <li className="pt-4 font-semibold text-white">Account</li>
                                <li><Link to="/verify" className="hover:text-blue-400 transition-colors">Verify Account</Link></li>
                                <li><Link to="/forgot-password" className="hover:text-blue-400 transition-colors">Reset Password</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-lg mb-6">Stay Updated</h3>
                            <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates and vendor offers.</p>
                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-white transition-all"
                                />
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11">Subscribe</Button>
                            </form>
                        </div>
                    </div>

                    <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                        <p>© {new Date().getFullYear()} Mistock HQ Inc. All rights reserved.</p>
                        <div className="flex space-x-8 mt-4 md:mt-0">
                            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                            <Link to="/disclaimer" className="hover:text-white transition-colors">Privacy & Legal</Link>
                            <Link to="/contact" className="hover:text-white transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
