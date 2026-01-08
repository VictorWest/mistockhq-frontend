import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const VerificationPage = () => {
    const [step, setStep] = useState<'input' | 'verify' | 'success'>('input');
    const [email, setEmail] = useState('');

    const handleSendCode = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => setStep('verify'), 1000);
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate verification
        setTimeout(() => setStep('success'), 1000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md shadow-xl border-slate-200">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <ShieldIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">Account Verification</CardTitle>
                    <CardDescription>
                        {step === 'input' && "Enter your email to receive a verification code."}
                        {step === 'verify' && `Enter the 6-digit code sent to ${email}`}
                        {step === 'success' && "Your account has been successfully verified."}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {step === 'input' && (
                        <form onSubmit={handleSendCode} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">Send Verification Code</Button>
                        </form>
                    )}

                    {step === 'verify' && (
                        <form onSubmit={handleVerify} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="code">Verification Code</Label>
                                <Input id="code" type="text" placeholder="123456" className="text-center text-2xl tracking-widest" maxLength={6} required />
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">Verify Account</Button>
                            <div className="text-center">
                                <button type="button" onClick={() => setStep('input')} className="text-sm text-blue-600 hover:underline">Change email</button>
                            </div>
                        </form>
                    )}

                    {step === 'success' && (
                        <div className="text-center space-y-6">
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <p className="text-slate-600">You can now access all features of Mistock HQ used by your organization.</p>
                            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                                <Link to="/dashboard">Go to Dashboard</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
                {step !== 'success' && (
                    <CardFooter className="justify-center border-t bg-slate-50/50 p-4">
                        <Link to="/dashboard" className="text-sm text-slate-500 hover:text-slate-900 flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
                        </Link>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export const ForgotPasswordPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md shadow-xl border-slate-200">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <LockIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">Reset Password</CardTitle>
                    <CardDescription>
                        {!isSubmitted
                            ? "Enter your email address and we'll send you a link to reset your password."
                            : "Check your email for instructions to reset your password."
                        }
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reset-email">Email Address</Label>
                                <Input id="reset-email" type="email" placeholder="name@company.com" required />
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">Send Reset Link</Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
                                <Mail className="w-8 h-8 text-blue-600" />
                            </div>
                            <p className="text-slate-600 text-sm">
                                If an account exists for that email, you will receive password reset instructions shortly.
                            </p>
                            <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                                Try another email
                            </Button>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="justify-center border-t bg-slate-50/50 p-4">
                    <Link to="/dashboard" className="text-sm text-slate-500 hover:text-slate-900 flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

// Icons not in lucide-react main import in some versions or usually custom composed
const ShieldIcon = (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
)

const LockIcon = (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
)
