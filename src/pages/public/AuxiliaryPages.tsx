import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AboutPage = () => (
    <div className="bg-white min-h-screen">
        <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/10" />
            <div className="container mx-auto px-4 relative">
                <h1 className="text-5xl font-bold mb-6">Redefining Inventory Management</h1>
                <p className="text-xl text-slate-300 max-w-2xl">Building the bridge between businesses and suppliers for a seamless, connected future.</p>
            </div>
        </div>
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="prose prose-lg prose-slate max-w-none">
                <p className="lead text-2xl text-slate-600 mb-10 leading-relaxed font-light">
                    Mistock HQ is not just software; it's a paradigm shift in how modern businesses handle logistics. We envision a world where stockouts are history and supplier relationships are frictionless.
                </p>
                <div className="grid md:grid-cols-2 gap-12 my-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Mission</h3>
                        <p className="text-slate-600">To democratize enterprise-grade supply chain tools, making them accessible to businesses of all scales, fostering growth and efficiency.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Vision</h3>
                        <p className="text-slate-600">A global, interconnected marketplace where transparency and trust drive every transaction, powered by intelligent technology.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const ContactPage = () => (
    <div className="bg-slate-50 min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
                <p className="text-slate-600 text-lg">We'd love to hear from you. Our team is always here to help.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="col-span-1 space-y-6">
                    <Card className="border-none shadow-lg">
                        <CardContent className="p-8 flex items-start space-x-4">
                            <Mail className="h-6 w-6 text-blue-600 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg">Email</h3>
                                <p className="text-slate-500 mb-2">Our friendly team is here to help.</p>
                                <a href="mailto:support@mistockhq.com" className="text-blue-600 font-medium">support@mistockhq.com</a>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg">
                        <CardContent className="p-8 flex items-start space-x-4">
                            <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg">Office</h3>
                                <p className="text-slate-500 mb-2">Come say hello at our HQ.</p>
                                <p className="text-slate-900 font-medium">22 Adesuwa road<br />G.R.A Benin city, Edo state</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg">
                        <CardContent className="p-8 flex items-start space-x-4">
                            <Phone className="h-6 w-6 text-blue-600 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg">Phone</h3>
                                <p className="text-slate-500 mb-2">Mon-Fri from 8am to 5pm.</p>
                                <a href="tel:+2349037162950" className="text-blue-600 font-medium">+2349037162950</a>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-2">
                    <Card className="border-none shadow-xl h-full">
                        <CardHeader className="p-8 pb-0">
                            <CardTitle className="text-2xl">Send us a message</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-6">
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">First Name</label>
                                        <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Last Name</label>
                                        <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Email</label>
                                    <input type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Message</label>
                                    <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg h-40 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Tell us how we can help..." />
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
);

export const ServicesPage = () => (
    <div className="min-h-screen">
        <div className="bg-slate-900 text-white py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Premium Services</h1>
            <p className="text-xl text-slate-300">Comprehensive solutions for the modern enterprise</p>
        </div>

        <div className="container mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {[
                    { title: 'Inventory Management', desc: 'Real-time tracking, batch management, and expiry alerts.', icon: CheckCircle },
                    { title: 'Vendor Marketplace', desc: 'Connect with properly vetted suppliers instantly.', icon: Globe },
                    { title: 'Analytics & Reporting', desc: 'Deep insights into your business performance to drive growth.', icon: MessageSquare }, // Using MessageSquare as placeholder generic icon
                    { title: 'Secure Payments', desc: 'Mediated purchase flows with Paystack integration.', icon: Shield }
                ].map((service, i) => (
                    <Card key={i} className="flex flex-col md:flex-row items-center p-6 gap-6 hover:shadow-lg transition-shadow border-slate-200">
                        <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                            <service.icon className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{service.title}</h3>
                            <p className="text-slate-600">{service.desc}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    </div>
);

export const DisclaimerPage = () => (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 pb-4 border-b">Disclaimer</h1>
        <div className="prose prose-slate">
            <p className="mb-4">The information provided on Mistock HQ (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site.</p>
            <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.</p>
        </div>
    </div>
);

export const TermsPage = () => (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 pb-4 border-b">Terms and Conditions</h1>
        <div className="prose prose-slate">
            <p className="mb-4 font-bold">Effective Date: 2025-01-01</p>
            <p className="mb-4">Welcome to Mistock HQ!</p>
            <p className="mb-4">These terms and conditions outline the rules and regulations for the use of Mistock HQ's Website, located at https://mistockhq.com.</p>
            <p className="mb-4">By accessing this website we assume you accept these terms and conditions. Do not continue to use Mistock HQ if you do not agree to take all of the terms and conditions stated on this page.</p>
            <h3 className="text-xl font-bold mt-8 mb-4">1. License</h3>
            <p>Unless otherwise stated, Mistock HQ and/or its licensors own the intellectual property rights for all material on Mistock HQ. All intellectual property rights are reserved.</p>
        </div>
    </div>
);
