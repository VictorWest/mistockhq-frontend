
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ProtectedRoute, PublicOnlyRoute } from "@/components/ProtectedRoute";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PublicLayout from "./components/layout/PublicLayout";
import HomePage from "./pages/public/HomePage";
import VendorPage from "./pages/public/VendorPage";
import StocksPage from "./pages/public/StocksPage";
import { AboutPage, ContactPage, ServicesPage, TermsPage, DisclaimerPage } from "./pages/public/AuxiliaryPages";
import { VerificationPage, ForgotPasswordPage } from "./pages/public/AuthPages";
import { LoginPage, RegisterPage } from "./pages/public/LoginRegister";

const queryClient = new QueryClient();

const AppContent = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Routes - Only accessible to non-authenticated users */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PublicOnlyRoute><HomePage /></PublicOnlyRoute>} />
        <Route path="/vendors" element={<PublicOnlyRoute><VendorPage /></PublicOnlyRoute>} />
        <Route path="/stocks" element={<PublicOnlyRoute><StocksPage /></PublicOnlyRoute>} />
        <Route path="/about" element={<PublicOnlyRoute><AboutPage /></PublicOnlyRoute>} />
        <Route path="/contact" element={<PublicOnlyRoute><ContactPage /></PublicOnlyRoute>} />
        <Route path="/services" element={<PublicOnlyRoute><ServicesPage /></PublicOnlyRoute>} />
        <Route path="/terms" element={<PublicOnlyRoute><TermsPage /></PublicOnlyRoute>} />
        <Route path="/disclaimer" element={<PublicOnlyRoute><DisclaimerPage /></PublicOnlyRoute>} />
        <Route path="/verify" element={<PublicOnlyRoute><VerificationPage /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPasswordPage /></PublicOnlyRoute>} />
      </Route>

      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />

      {/* Protected Dashboard Route */}
      <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppProvider>
          <AppContent />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
