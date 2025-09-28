
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import Navbar from "@/components/Navbar";
// import { Shield, CheckCircle, Clock, AlertCircle, Eye, User } from "lucide-react";

// export interface Issue {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
//   createdAt: string;
// }

// // Map backend enum to readable frontend status
// const readableStatus: Record<Issue["status"], string> = {
//   OPEN: "Pending",
//   IN_PROGRESS: "In Progress",
//   RESOLVED: "Resolved",
// };

// const AdminPage = () => {
//   const [issues, setIssues] = useState<Issue[]>([]);
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const { toast } = useToast();
//   const token = localStorage.getItem("token");

//   // Fetch issues from backend
//   const fetchIssues = async (url?: string) => {
//     try {
//       const res = await fetch(url || "http://localhost:8080/api/issues/all", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to fetch issues");
//       const data: Issue[] = await res.json();
//       setIssues(data);
//     } catch (err) {
//       console.error(err);
//       toast({ title: "Error", description: "Failed to fetch issues from backend" });
//     }
//   };

//   useEffect(() => {
//     fetchIssues();
//   }, []);

//   // Update issue status
//   const updateIssueStatus = async (issueId: string, newStatus: Issue["status"]) => {
//     try {
//       const res = await fetch(
//         `http://localhost:8080/api/issues/${issueId}/status?status=${newStatus}`,
//         {
//           method: "PUT",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (!res.ok) throw new Error("Failed to update status");

//       setIssues(prev =>
//         prev.map(issue => (issue.id === issueId ? { ...issue, status: newStatus } : issue))
//       );

//       toast({ title: "Status Updated", description: `Issue marked as ${readableStatus[newStatus]}` });
//     } catch (err) {
//       console.error(err);
//       toast({ title: "Error", description: "Failed to update issue status" });
//     }
//   };

//   // Status icons
//   const getStatusIcon = (status: Issue["status"]) => {
//     switch (status) {
//       case "OPEN": return <AlertCircle className="w-4 h-4" />;
//       case "IN_PROGRESS": return <Clock className="w-4 h-4" />;
//       case "RESOLVED": return <CheckCircle className="w-4 h-4" />;
//     }
//   };

//   const getStatusVariant = (status: Issue["status"]) => {
//     switch (status) {
//       case "OPEN": return "destructive";
//       case "IN_PROGRESS": return "default";
//       case "RESOLVED": return "secondary";
//     }
//   };

//   // Counts
//   const pendingCount = issues.filter(i => i.status === "OPEN").length;
//   const inProgressCount = issues.filter(i => i.status === "IN_PROGRESS").length;
//   const resolvedCount = issues.filter(i => i.status === "RESOLVED").length;

//   // Fetch filtered issues whenever filters change
//   useEffect(() => {
//     const fetchFilteredIssues = async () => {
//       try {
//         let url = "http://localhost:8080/api/issues/all";

//         // Status filter
//         if (statusFilter !== "all") {
//           url = `http://localhost:8080/api/issues/filter/status/${statusFilter}/sorted`;
//         }

//         // Date filter
//         if (fromDate && toDate) {
//           const fromISO = new Date(fromDate).toISOString();
//           const toISO = new Date(toDate).toISOString();
//           url = `http://localhost:8080/api/issues/filter/date?from=${fromISO}&to=${toISO}`;
//         }

//         await fetchIssues(url);
//       } catch (err) {
//         console.error(err);
//         toast({ title: "Error", description: "Failed to fetch filtered issues" });
//       }
//     };

//     fetchFilteredIssues();
//   }, [statusFilter, fromDate, toDate]);

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3 font-playfair">
//               <Shield className="w-8 h-8 text-primary" /> Admin Dashboard
//             </h1>
//             <p className="text-muted-foreground">Manage and resolve community issues</p>
//           </div>
//           <div className="flex items-center gap-2 px-4 py-2 bg-gradient-card rounded-lg border">
//             <User className="w-4 h-4 text-primary" />
//             <span className="text-sm font-medium text-foreground">Admin</span>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card className="bg-gradient-card border border-border shadow-professional-sm">
//             <CardContent className="p-6 flex justify-between items-center">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Pending Issues</p>
//                 <p className="text-3xl font-bold text-pending">{pendingCount}</p>
//               </div>
//               <div className="w-12 h-12 bg-pending/10 rounded-full flex items-center justify-center">
//                 <AlertCircle className="w-6 h-6 text-pending" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-card border border-border shadow-professional-sm">
//             <CardContent className="p-6 flex justify-between items-center">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">In Progress</p>
//                 <p className="text-3xl font-bold text-in-progress">{inProgressCount}</p>
//               </div>
//               <div className="w-12 h-12 bg-in-progress/10 rounded-full flex items-center justify-center">
//                 <Clock className="w-6 h-6 text-in-progress" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-card border border-border shadow-professional-sm">
//             <CardContent className="p-6 flex justify-between items-center">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Resolved</p>
//                 <p className="text-3xl font-bold text-resolved">{resolvedCount}</p>
//               </div>
//               <div className="w-12 h-12 bg-resolved/10 rounded-full flex items-center justify-center">
//                 <CheckCircle className="w-6 h-6 text-resolved" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-4">
//           {/* Status Filter */}
//           <div>
//             <label className="block text-sm font-medium text-muted-foreground mb-1">Filter by Status</label>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border border-border rounded px-2 py-1"
//             >
//               <option value="all">All</option>
//               <option value="OPEN">Pending</option>
//               <option value="IN_PROGRESS">In Progress</option>
//               <option value="RESOLVED">Resolved</option>
//             </select>
//           </div>

//           {/* Date Filters */}
//           <div className="flex items-center gap-2">
//             <div>
//               <label className="block text-sm font-medium text-muted-foreground mb-1">From</label>
//               <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-muted-foreground mb-1">To</label>
//               <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
//             </div>
//           </div>
//         </div>

//         {/* Issues Table */}
//         <Card className="bg-gradient-card shadow-professional-sm">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Shield className="w-5 h-5 text-primary" /> Issue Management
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Issue</TableHead>
//                     <TableHead>Location</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Created</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {issues.map(issue => (
//                     <TableRow key={issue.id}>
//                       <TableCell>
//                         <div>
//                           <div className="font-medium text-foreground">{issue.title}</div>
//                           <div className="text-sm text-muted-foreground max-w-xs truncate">{issue.description}</div>
//                         </div>
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">{issue.location}</TableCell>
//                       <TableCell>
//                         <Badge variant={getStatusVariant(issue.status)} className="flex items-center gap-1 w-fit">
//                           {getStatusIcon(issue.status)} {readableStatus[issue.status]}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">{new Date(issue.createdAt).toLocaleDateString()}</TableCell>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <Button variant="outline" size="sm"><Eye className="w-4 h-4" /></Button>
//                           {issue.status === "OPEN" && (
//                             <Button variant="default" size="sm" onClick={() => updateIssueStatus(issue.id, "IN_PROGRESS")}>Start Progress</Button>
//                           )}
//                           {issue.status === "IN_PROGRESS" && (
//                             <Button variant="default" size="sm" onClick={() => updateIssueStatus(issue.id, "RESOLVED")}>
//                               <CheckCircle className="w-4 h-4 mr-1" /> Resolve
//                             </Button>
//                           )}
//                           {issue.status === "RESOLVED" && <Badge variant="secondary" className="text-xs">Completed</Badge>}
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default AdminPage;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Shield, CheckCircle, Clock, AlertCircle, Eye, User } from "lucide-react";

export interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
}

// Map backend enum to readable frontend status
const readableStatus: Record<Issue["status"], string> = {
  OPEN: "Pending",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
};

const AdminPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const { toast } = useToast();
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // <-- navigate hook

  const fetchIssues = async (url?: string) => {
    try {
      const res = await fetch(url || "http://localhost:8080/api/issues/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch issues");
      const data: Issue[] = await res.json();
      setIssues(data);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to fetch issues from backend" });
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const updateIssueStatus = async (issueId: string, newStatus: Issue["status"]) => {
    try {
      const res = await fetch(`http://localhost:8080/api/issues/${issueId}/status?status=${newStatus}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to update status");
      setIssues(prev => prev.map(issue => (issue.id === issueId ? { ...issue, status: newStatus } : issue)));
      toast({ title: "Status Updated", description: `Issue marked as ${readableStatus[newStatus]}` });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to update issue status" });
    }
  };

  const getStatusIcon = (status: Issue["status"]) => {
    switch (status) {
      case "OPEN": return <AlertCircle className="w-4 h-4" />;
      case "IN_PROGRESS": return <Clock className="w-4 h-4" />;
      case "RESOLVED": return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status: Issue["status"]) => {
    switch (status) {
      case "OPEN": return "destructive";
      case "IN_PROGRESS": return "default";
      case "RESOLVED": return "secondary";
    }
  };

  const pendingCount = issues.filter(i => i.status === "OPEN").length;
  const inProgressCount = issues.filter(i => i.status === "IN_PROGRESS").length;
  const resolvedCount = issues.filter(i => i.status === "RESOLVED").length;

  useEffect(() => {
    const fetchFilteredIssues = async () => {
      try {
        let url = "http://localhost:8080/api/issues/all";
        if (statusFilter !== "all") url = `http://localhost:8080/api/issues/filter/status/${statusFilter}/sorted`;
        if (fromDate && toDate) {
          const fromISO = new Date(fromDate).toISOString();
          const toISO = new Date(toDate).toISOString();
          url = `http://localhost:8080/api/issues/filter/date?from=${fromISO}&to=${toISO}`;
        }
        await fetchIssues(url);
      } catch (err) {
        console.error(err);
        toast({ title: "Error", description: "Failed to fetch filtered issues" });
      }
    };
    fetchFilteredIssues();
  }, [statusFilter, fromDate, toDate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3 font-playfair">
              <Shield className="w-8 h-8 text-primary" /> Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage and resolve community issues</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-card rounded-lg border">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Admin</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border border-border shadow-professional-sm">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Issues</p>
                <p className="text-3xl font-bold text-pending">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-pending/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-pending" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border border-border shadow-professional-sm">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-in-progress">{inProgressCount}</p>
              </div>
              <div className="w-12 h-12 bg-in-progress/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-in-progress" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border border-border shadow-professional-sm">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-3xl font-bold text-resolved">{resolvedCount}</p>
              </div>
              <div className="w-12 h-12 bg-resolved/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-resolved" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-border rounded px-2 py-1"
            >
              <option value="all">All</option>
              <option value="OPEN">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">From</label>
              <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">To</label>
              <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Issues Table */}
        <Card className="bg-gradient-card shadow-professional-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Issue Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues.map(issue => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{issue.title}</div>
                          <div className="text-sm text-muted-foreground max-w-xs truncate">{issue.description}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{issue.location}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(issue.status)} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(issue.status)} {readableStatus[issue.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{new Date(issue.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {/* Navigate to Issue Details Page */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/issues/${issue.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {issue.status === "OPEN" && (
                            <Button variant="default" size="sm" onClick={() => updateIssueStatus(issue.id, "IN_PROGRESS")}>Start Progress</Button>
                          )}
                          {issue.status === "IN_PROGRESS" && (
                            <Button variant="default" size="sm" onClick={() => updateIssueStatus(issue.id, "RESOLVED")}>
                              <CheckCircle className="w-4 h-4 mr-1" /> Resolve
                            </Button>
                          )}
                          {issue.status === "RESOLVED" && <Badge variant="secondary" className="text-xs">Completed</Badge>}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminPage;

