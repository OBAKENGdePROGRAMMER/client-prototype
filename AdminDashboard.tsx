import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "@/components/ThemeProvider";
import DashboardSidebar from "./DashboardSidebar";
import StatCard from "./StatCard";
import MatchCard from "./MatchCard";
import { Sun, Moon, Users, GraduationCap, Calendar, AlertTriangle, Search, Download, Plus, Check, X } from "lucide-react";

// todo: remove mock functionality
const mockUsers = [
  { id: "1", name: "John Smith", email: "john@smu.ac.za", role: "Mentor", status: "active", date: "2024-01-15" },
  { id: "2", name: "Sarah Johnson", email: "sarah@smu.ac.za", role: "Mentor", status: "pending", date: "2024-12-01" },
  { id: "3", name: "Thabo Molefe", email: "thabo@school.edu.za", role: "Mentee", status: "active", date: "2024-02-20" },
  { id: "4", name: "Lerato Ndlovu", email: "lerato@school.edu.za", role: "Mentee", status: "active", date: "2024-03-10" },
  { id: "5", name: "Michael Chen", email: "michael@smu.ac.za", role: "Mentor", status: "inactive", date: "2024-01-05" },
];

const mockMatch = {
  mentor: { id: "2", name: "Sarah Johnson", role: "3rd Year Engineering", institution: "SMU" },
  mentee: { id: "4", name: "Lerato Ndlovu", role: "Grade 10 Student", institution: "Pretoria High" },
  matchScore: 87,
  matchCriteria: ["Engineering Interest", "Female Mentor Preference", "Weekday Availability"],
  status: "pending" as const,
};

const mockAlerts = [
  { id: "1", type: "risk", message: "Mentee flagged for psychosocial support review", user: "Thabo Molefe", date: "Dec 5, 2024" },
  { id: "2", type: "pending", message: "New mentor application pending verification", user: "Sarah Johnson", date: "Dec 3, 2024" },
  { id: "3", type: "inactive", message: "Mentor inactive for 30+ days", user: "Michael Chen", date: "Dec 1, 2024" },
];

export default function AdminDashboard() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  } as React.CSSProperties;

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-500/10 text-green-600",
      pending: "bg-yellow-500/10 text-yellow-600",
      inactive: "bg-gray-500/10 text-gray-600",
    };
    return <Badge variant="secondary" className={colors[status]}>{status}</Badge>;
  };

  return (
    <SidebarProvider style={sidebarStyle}>
      <div className="flex h-screen w-full">
        <DashboardSidebar role="admin" userName="Admin User" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 p-4 border-b border-border bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage the ABM Network</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} data-testid="button-theme-toggle">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="outline" data-testid="button-export">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button data-testid="button-add-user">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
                <TabsTrigger value="users" data-testid="tab-users">Users</TabsTrigger>
                <TabsTrigger value="matching" data-testid="tab-matching">Matching</TabsTrigger>
                <TabsTrigger value="alerts" data-testid="tab-alerts">Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    title="Total Mentors"
                    value="254"
                    change={12}
                    changeLabel="this month"
                    icon={Users}
                    iconColor="text-blue-500"
                  />
                  <StatCard
                    title="Active Mentees"
                    value="1,248"
                    change={8}
                    changeLabel="this month"
                    icon={GraduationCap}
                    iconColor="text-green-500"
                  />
                  <StatCard
                    title="Sessions This Month"
                    value="456"
                    change={23}
                    changeLabel="vs last month"
                    icon={Calendar}
                    iconColor="text-purple-500"
                  />
                  <StatCard
                    title="Pending Approvals"
                    value="12"
                    icon={AlertTriangle}
                    iconColor="text-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                      <CardTitle className="text-lg">Recent Alerts</CardTitle>
                      <Button variant="ghost" size="sm">View All</Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {mockAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                            alert.type === "risk" ? "text-red-500" :
                            alert.type === "pending" ? "text-yellow-500" : "text-gray-500"
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{alert.message}</p>
                            <p className="text-xs text-muted-foreground">{alert.user} - {alert.date}</p>
                          </div>
                          <Button variant="outline" size="sm" data-testid={`button-review-${alert.id}`}>
                            Review
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Pending Match</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MatchCard
                        {...mockMatch}
                        onAccept={() => console.log("Match accepted")}
                        onReject={() => console.log("Match rejected")}
                        onRematch={() => console.log("Finding new match")}
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="users" className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      data-testid="input-search-users"
                    />
                  </div>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} data-testid={`user-row-${user.id}`}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>{user.date}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              {user.status === "pending" && (
                                <>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button variant="ghost" size="sm">View</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              <TabsContent value="matching" className="space-y-6">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Pending Matches</h2>
                  <Button data-testid="button-auto-match">
                    Run Auto-Match
                  </Button>
                </div>
                <MatchCard
                  {...mockMatch}
                  onAccept={() => console.log("Match accepted")}
                  onReject={() => console.log("Match rejected")}
                  onRematch={() => console.log("Finding new match")}
                />
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground mb-4">System Alerts</h2>
                {mockAlerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardContent className="flex items-start gap-4 p-4">
                      <AlertTriangle className={`h-6 w-6 ${
                        alert.type === "risk" ? "text-red-500" :
                        alert.type === "pending" ? "text-yellow-500" : "text-gray-500"
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">{alert.user} - {alert.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Dismiss</Button>
                        <Button size="sm">Take Action</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
