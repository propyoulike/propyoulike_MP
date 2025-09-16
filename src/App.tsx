import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Builders from "./pages/Builders";
import BuilderDetail from "./pages/BuilderDetail";
import PropertyDetail from "./pages/PropertyDetail";
import ProjectsByStageDetail from "./pages/ProjectsByStageDetail";
import Solutions from "./pages/Solutions";
import Partner from "./pages/Partner";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Favorites from "./pages/Favorites";
import Admin from "./pages/Admin";
import BuilderLanding from "./pages/BuilderLanding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:propertyId" element={<PropertyDetail />} />
          <Route path="/builders" element={<Builders />} />
          <Route path="/builder/:builderId" element={<BuilderDetail />} />
          <Route path="/projects/:stage" element={<ProjectsByStageDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/builder-landing/:pageSlug" element={<BuilderLanding />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
