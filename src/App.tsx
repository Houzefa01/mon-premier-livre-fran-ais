import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AlphabetPage from "./pages/AlphabetPage";
import SyllabesPage from "./pages/SyllabesPage";
import LecturePage from "./pages/LecturePage";
import EcriturePage from "./pages/EcriturePage";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/alphabet" element={<AlphabetPage />} />
          <Route path="/syllabes" element={<SyllabesPage />} />
          <Route path="/lecture" element={<LecturePage />} />
          <Route path="/ecriture" element={<EcriturePage />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
