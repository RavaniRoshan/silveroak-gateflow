import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { NeoCommandPalette, useNeoCommandPalette } from "@/components/NeoCommandPalette";
import { useNeoKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import BranchSelection from "./pages/BranchSelection";
import Dashboard from "./pages/Dashboard";
import PYQs from "./pages/PYQs";
import Tests from "./pages/Tests";
import StudyResources from "./pages/StudyResources";
import Subjects from "./pages/Subjects";
import MockPapers from "./pages/MockPapers";
import ConnectMentor from "./pages/ConnectMentor";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

// Inner App component that has access to Router context
const AppContent = () => {
  const commandPalette = useNeoCommandPalette();
  const keyboardNavigation = useNeoKeyboardNavigation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/branch-selection" element={
          <ProtectedRoute requireBranch={false}>
            <BranchSelection />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/pyqs" element={
          <ProtectedRoute>
            <PYQs />
          </ProtectedRoute>
        } />
        <Route path="/tests" element={
          <ProtectedRoute>
            <Tests />
          </ProtectedRoute>
        } />
        <Route path="/study-resources" element={
          <ProtectedRoute>
            <StudyResources />
          </ProtectedRoute>
        } />
        <Route path="/subjects" element={
          <ProtectedRoute>
            <Subjects />
          </ProtectedRoute>
        } />
        <Route path="/mock-papers" element={
          <ProtectedRoute>
            <MockPapers />
          </ProtectedRoute>
        } />
        <Route path="/connect-mentor" element={
          <ProtectedRoute>
            <ConnectMentor />
          </ProtectedRoute>
        } />
        <Route path="/community" element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } />
        <Route path="/resources" element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Neo-Minimal Global Components */}
      <NeoCommandPalette 
        isOpen={commandPalette.isOpen}
        onClose={commandPalette.closePalette}
      />
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 left-4 z-40 flex flex-col space-y-3">
        <Button
          onClick={commandPalette.togglePalette}
          className="neo-button-secondary w-12 h-12 p-0 rounded-full shadow-glow"
          title="Command Palette (⌘K)"
        >
          <Command className="w-5 h-5" />
        </Button>
      </div>
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <TooltipProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
