import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Admin from "./pages/admin/Admin";
import AdminSetup from "./pages/admin/AdminSetup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to log current route
const RouteLogger = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log("🚀 Current Route:", location.pathname);
    console.log("🔗 Available Admin URLs:");
    console.log("   - Local Admin: http://localhost:8080/admin");
    console.log("   - Secure Admin: http://localhost:8080/secure-admin-panel-2024");
    console.log("   - Admin Setup: http://localhost:8080/admin-setup");
    console.log("   - Production Admin: https://broker-profitpay.onrender.com/secure-admin-panel-2024");
  }, [location.pathname]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteLogger />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Secure admin route - only accessible via direct URL */}
          <Route path="/secure-admin-panel-2024" element={<Admin />} />
          {/* Development admin route - remove this in production */}
          <Route path="/admin" element={<Admin />} />
          {/* Admin setup for development - remove this in production */}
          <Route path="/admin-setup" element={<AdminSetup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
