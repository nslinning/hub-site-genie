
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import ApiKeys from "./pages/admin/ApiKeys";
import { AuthProvider } from "./contexts/AuthContext";

// Manglende filer som vil bli lagt til i fremtidige implementasjoner
// import CustomerList from "./pages/admin/CustomerList";
// import CustomerDetails from "./pages/admin/CustomerDetails";
// import ProjectList from "./pages/admin/ProjectList";
// import ProjectDetails from "./pages/admin/ProjectDetails";
// import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin ruter */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/api-keys" element={<ApiKeys />} />
            
            {/* Placeholder ruter som vil bli implementert senere */}
            {/* <Route path="/admin/customers" element={<CustomerList />} />
            <Route path="/admin/customers/:id" element={<CustomerDetails />} />
            <Route path="/admin/projects" element={<ProjectList />} />
            <Route path="/admin/projects/:id" element={<ProjectDetails />} />
            <Route path="/admin/settings" element={<Settings />} /> */}
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
