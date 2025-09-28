import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  photoUrl?: string;
  location?: string;
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/issues/all", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to fetch issues");
        const data: Issue[] = await res.json();
        setIssues(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [token]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with New Issue button */}
        <div className="flex justify-center mb-8">
          <Button onClick={() => navigate("/issues")} variant="hero">

            New Issue
          </Button>
        </div>

        {/* Issue List */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading issues...</p>
        ) : issues.length === 0 ? (
          <p className="text-center text-muted-foreground">No issues reported yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <Card key={issue.id} className="shadow-professional-md">
                <CardHeader>
                  <CardTitle>{issue.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{issue.description}</p>
                  {issue.location && (
                    <p className="text-xs text-muted-foreground">
                      <strong>Location:</strong> {issue.location}
                    </p>
                  )}
                  <p className="text-xs">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        issue.status === "OPEN"
                          ? "text-red-600"
                          : issue.status === "IN_PROGRESS"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </p>
                  {issue.photoUrl && (
                    <img
                      src={issue.photoUrl}
                      alt={issue.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default IssuesPage;
