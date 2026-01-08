import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ArrowRight,
    CheckCircle2,
    Shield,
    Globe,
    Zap,
    BarChart,
    Layers,
    Clock,
    Smartphone,
    Truck,
    ShoppingBag,
    Users,
    Building2,
    HelpCircle,
    ChevronDown,
    TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const HomePage = () => {
    return (
        <div className="flex flex-col w-full overflow-x-hidden font-sans bg-sky-50/50 selection:bg-sky-100">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 bg-gradient-to-b from-sky-50 via-white to-sky-50 text-slate-900 overflow-hidden border-b border-sky-100">
                {/* Subtle Geometric Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] bg-[size:40px_40px] -z-10" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto space-y-8">
                        <div className="flex justify-center">
                            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium bg-slate-100 text-slate-800 border border-slate-200 rounded-full">
                                <span className="mr-2">🎉</span> Mistock HQ 2.0 is Here
                            </Badge>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                            Enterprise Supply Chain <br className="hidden md:block" />
                            <span className="text-blue-600">Without the Complexity</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
                            Mistock HQ unifies your inventory, vendor management, and purchasing flows into one powerful, intuitive platform.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white text-lg px-8 h-14 rounded-md shadow-lg shadow-slate-200 transition-all">
                                <Link to="/register">
                                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-lg px-8 h-14 rounded-md">
                                <Link to="/vendors">View Vendor Marketplace</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Dashboard Preview - Clean Card Style */}
                    <div className="mt-16 mx-auto max-w-6xl">
                        <div className="rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
                            {/* Mock UI Header */}
                            <div className="h-10 border-b border-slate-100 bg-slate-50/50 flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                </div>
                                <div className="bg-white border-slate-200 border px-3 py-1 rounded-md text-[10px] text-slate-400 ml-4 font-mono w-48">
                                    mistock-hq.com/dashboard
                                </div>
                            </div>

                            {/* Mock Dashboard Body Placeholder */}
                            <div className="p-4 md:p-8 bg-slate-50/30 aspect-[16/9] flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl opacity-80">
                                    {/* Mock Card 1 */}
                                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                                        <div className="h-2 w-20 bg-slate-200 rounded" />
                                        <div className="h-8 w-16 bg-slate-900 rounded" />
                                        <div className="h-20 w-full bg-blue-50/50 rounded-md border border-blue-100" />
                                    </div>
                                    {/* Mock Card 2 */}
                                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                                        <div className="h-2 w-20 bg-slate-200 rounded" />
                                        <div className="h-8 w-16 bg-blue-600 rounded" />
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-slate-100 rounded" />
                                            <div className="h-2 w-4/5 bg-slate-100 rounded" />
                                            <div className="h-2 w-full bg-slate-100 rounded" />
                                        </div>
                                    </div>
                                    {/* Mock Card 3 */}
                                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                                        <div className="h-2 w-20 bg-slate-200 rounded" />
                                        <div className="h-8 w-16 bg-slate-900 rounded" />
                                        <div className="flex gap-2">
                                            <div className="h-8 w-8 rounded-full bg-slate-100" />
                                            <div className="h-8 w-8 rounded-full bg-slate-100" />
                                            <div className="h-8 w-8 rounded-full bg-slate-100" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-slate-200 text-slate-900 font-medium">
                                        Interactive Dashboard Preview
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section (Clean) */}
            <section className="py-12 bg-white border-b border-slate-100">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
                        Trusted by industry leaders
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity">
                        <span className="text-xl font-bold font-serif text-slate-900">VOGUE</span>
                        <span className="text-xl font-bold font-sans tracking-tighter text-slate-900">STRIPE</span>
                        <span className="text-xl font-bold font-mono text-slate-900">acme.co</span>
                        <span className="text-xl font-bold font-sans italic text-slate-900">Global Tech</span>
                        <span className="text-xl font-bold tracking-widest text-slate-900">NEXUS</span>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-white relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white to-sky-50/30 -z-10" />
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase mb-2">Process</h2>
                        <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Streamline your operations in three steps.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Users,
                                title: "1. Connect Vendors",
                                desc: "Invite your existing suppliers or discover new vetted partners from our global marketplace."
                            },
                            {
                                icon: ShoppingBag,
                                title: "2. Manage Inventory",
                                desc: "Centralize your stock levels, automate reordering, and track assets across all locations."
                            },
                            {
                                icon: TrendingUp,
                                title: "3. Scale & Optimize",
                                desc: "Use advanced analytics to reduce waste, optimize cash flow, and grow your business."
                            }
                        ].map((step, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                    <step.icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-sky-50/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100/40 via-transparent to-transparent -z-10" />
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase mb-2">Features</h2>
                        <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Everything provided, nothing missing.
                        </p>
                        <p className="text-lg text-slate-600">
                            Mistock HQ provides the essential tools you need to run a modern, efficient supply chain.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Layers,
                                title: 'Unified Inventory',
                                desc: 'Track stock across multiple warehouses and fast-moving locations in real-time.'
                            },
                            {
                                icon: Shield,
                                title: 'Mediated Purchasing',
                                desc: 'Strict approval workflows ensure every purchase is verified before funds leave.'
                            },
                            {
                                icon: Globe,
                                title: 'Global Vendors',
                                desc: 'Access a vetted marketplace of top-tier suppliers categorized by industry.'
                            },
                            {
                                icon: Clock,
                                title: 'Real-time Tracking',
                                desc: 'Monitor stock movements, sales, and low-stock alerts instantly.'
                            },
                            {
                                icon: BarChart,
                                title: 'C-Suite Analytics',
                                desc: 'Generate professional reports on profitability, turnover, and valuation.'
                            },
                            {
                                icon: Smartphone,
                                title: 'Mobile Ready',
                                desc: 'Manage your operations from anywhere with our fully responsive interface.'
                            }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg hover:border-blue-100 transition-all group">
                                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Tailored for your industry.
                            </h2>
                            <p className="text-lg text-slate-600">
                                Whether you're running a small cafe or a multinational construction firm, Mistock HQ scales with you.
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link to="/services">Explore Industries <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "Retail & E-commerce", icon: ShoppingBag },
                            { name: "Construction", icon: Building2 },
                            { name: "Healthcare", icon: CheckCircle2 },
                            { name: "Logistics", icon: Truck },
                        ].map((industry, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-100 text-center hover:bg-slate-100 transition-colors">
                                <industry.icon className="mx-auto h-8 w-8 text-slate-400 mb-3" />
                                <h3 className="font-bold text-slate-900">{industry.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Success Stories</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "Mistock HQ completely transformed how we handle procurement. We've cut waste by 40% in just three months.",
                                author: "Sarah Jenkins",
                                role: "Operations Director, TechFlow",
                                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"
                            },
                            {
                                quote: "The vendor marketplace is a game changer. Finding reliable suppliers used to take weeks, now it takes minutes.",
                                author: "Michael Chen",
                                role: "CEO, BuildSmart Inc.",
                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60"
                            },
                            {
                                quote: "Finally, a system that my entire team actually enjoys using. The modern interface is intuitive and fast.",
                                author: "Elena Rodriguez",
                                role: "Supply Chain Manager, FreshFoods",
                                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60"
                            }
                        ].map((testimonial, i) => (
                            <div key={i} className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    {[...Array(5)].map((_, i) => <Shield key={i} className="h-4 w-4 fill-current" />)}
                                </div>
                                <p className="text-lg text-slate-300 italic mb-6">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover border-2 border-slate-600" />
                                    <div>
                                        <h4 className="font-bold">{testimonial.author}</h4>
                                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-600">Have questions? We're here to help.</p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        {[
                            {
                                q: "Is there a free trial?",
                                a: "Yes, we offer a 14-day free trial on all plans. No credit card required to start."
                            },
                            {
                                q: "Can I invite my own vendors?",
                                a: "Absolutely. You can onboard your existing private vendors or choose from our public marketplace."
                            },
                            {
                                q: "Does Mistock HQ integrate with Xero/Quickbooks?",
                                a: "Yes, we have native integrations for major accounting software including Xero, Quickbooks, and Sage."
                            },
                            {
                                q: "Is my data secure?",
                                a: "Security is our top priority. We use bank-level encryption and are SOC 2 Type II compliant."
                            }
                        ].map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger className="text-lg font-medium text-slate-900">{faq.q}</AccordionTrigger>
                                <AccordionContent className="text-slate-600">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Stats Section with White Background */}
            <section className="py-24 bg-sky-50/30 border-t border-sky-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '500k+', label: 'Items Tracked' },
                            { value: '99.9%', label: 'Uptime' },
                            { value: '$2M+', label: 'Processed' },
                            { value: '24/7', label: 'Support' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center border-l border-slate-200 first:border-0 border-slate-300">
                                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{stat.value}</div>
                                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to regain control?</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                        Join modern businesses that are scaling faster with Mistock HQ.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-slate-900 text-lg px-8 h-14 rounded-md">
                            <Link to="/register">Get Started Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 text-lg px-8 h-14 rounded-md">
                            <Link to="/contact">Contact Sales</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
