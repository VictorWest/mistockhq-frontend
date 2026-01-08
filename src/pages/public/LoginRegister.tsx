import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Facebook, Mail, ArrowRight, CheckCircle, Smartphone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AuthLayout = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) => (
    <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left Side - Visuals */}
        <div className="hidden lg:flex flex-col justify-between bg-slate-900 text-white p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/10 z-0" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

            <div className="relative z-10">
                <Link to="/" className="flex items-center space-x-3 w-fit">
                    <div className="w-10 h-10 bg-white rounded flex items-center justify-center p-0.5">
                        <img src="/logo.jpg" alt="Mistock HQ" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xl font-bold">Mistock HQ</span>
                </Link>
            </div>

            <div className="relative z-10 space-y-6 max-w-lg">
                <h1 className="text-5xl font-bold leading-tight">Manage your inventory with confidence.</h1>
                <p className="text-xl text-slate-300">Join thousands of businesses streamlining their supply chain operations today.</p>
                <div className="grid grid-cols-2 gap-4 pt-8">
                    <div className="bg-slate-800/50 p-4 rounded-xl backdrop-blur-sm border border-slate-700">
                        <CheckCircle className="w-6 h-6 text-blue-400 mb-2" />
                        <h3 className="font-semibold">Real-time Tracking</h3>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl backdrop-blur-sm border border-slate-700">
                        <Smartphone className="w-6 h-6 text-purple-400 mb-2" />
                        <h3 className="font-semibold">Mobile Ready</h3>
                    </div>
                </div>
            </div>

            <div className="relative z-10 text-sm text-slate-500">
                © {new Date().getFullYear()} Mistock HQ Inc.
            </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center p-8 bg-slate-50">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
                </div>
                {children}
            </div>
        </div>
    </div>
);

import api from '@/lib/api'
import { useAppContext } from '@/contexts/AppContext'

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();
    const { setUser, setUserRole } = useAppContext()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null)
        setLoading(true)
        try {
            const resp = await api.login(email, password) as { id?: string, fullName?: string, businessName?: string, email?: string, designation?: string }
            // resp: { id, fullName, businessName, email, designation }
            setUser({ email: resp.email || '', fullName: resp.fullName || '', designation: resp.designation || 'user' })
            const role = resp.designation === 'super' ? 'superadmin' : resp.designation === 'vendor' ? 'vendor' : 'user'
            setUserRole(role)
            navigate('/dashboard')
        } catch (err: unknown) {
            console.log(err)
            const message = err instanceof Error ? err.message : String(err)
            setError(message || 'Login failed')
        } finally {
            setLoading(false)
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Enter your credentials to access your account"
        >
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <Button variant="outline" className="w-full h-11 font-medium bg-white hover:bg-slate-50 relative" type="button">
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Sign in with Google
                    </Button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center"><Separator /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">Or continue with</span></div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@company.com" required className="h-11" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                <Button className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20" type="submit" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in to your account'}
                </Button>

                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

                <p className="text-center text-sm text-slate-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500">
                        Sign up for free
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();
    const { setUser, setUserRole } = useAppContext()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null)
        setLoading(true)
        try {
            await api.sendOtp(email)
            setOtpSent(true)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err)
            setError(message || 'Failed to send OTP')
        } finally { setLoading(false) }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const fullName = `${firstName} ${lastName}`
            await api.verifyOtp(email, otp, { fullName, businessName: fullName, email, password })
            // automatically sign in the newly created user
            const resp = await api.login(email, password) as { id?: string, fullName?: string, businessName?: string, email?: string, designation?: string }
            setUser({ email: resp.email || email, fullName: resp.fullName || fullName, designation: resp.designation || 'user' })
            const role = resp.designation === 'super' ? 'superadmin' : resp.designation === 'vendor' ? 'vendor' : 'user'
            setUserRole(role)
            navigate('/dashboard')
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err)
            setError(message || 'OTP verification failed')
        } finally { setLoading(false) }
    }

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Start your 14-day free trial today"
        >
            <form onSubmit={handleRegister} className="space-y-6">
                {!otpSent ? (
                <>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="h-11" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="h-11" placeholder="Doe" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@company.com" required className="h-11" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            required
                            className="h-11 pr-10"
                            placeholder="Min. 8 characters"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
                </>
                ) : (
                <>
                <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required className="h-11" />
                </div>
                </>
                )}
                <div className="text-sm text-slate-500">
                    By clicking continue, you agree to our <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/disclaimer" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                </div>

                <Button className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20" type="submit" disabled={loading}>
                    {otpSent ? (loading ? 'Verifying...' : 'Verify OTP') : (loading ? 'Sending OTP...' : 'Create account')}
                </Button>

                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

                <p className="text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};
