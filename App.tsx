import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import MentorDashboardPage from "@/pages/mentor-dashboard";
import MenteeDashboardPage from "@/pages/mentee-dashboard";
import AdminDashboardPage from "@/pages/admin-dashboard";
import DonorDashboardPage from "@/pages/donor-dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard/mentor" component={MentorDashboardPage} />
      <Route path="/dashboard/mentee" component={MenteeDashboardPage} />
      <Route path="/dashboard/admin" component={AdminDashboardPage} />
      <Route path="/dashboard/donor" component={DonorDashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
