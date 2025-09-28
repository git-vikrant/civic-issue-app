import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
  location: string;
  latitude: number;
  longitude: number;
  photoUrl?: string;
}

const IssueDetailsPage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState<Issue | null>(null);
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/issues/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch issue details");
        const data: Issue = await res.json();
        setIssue(data);
      } catch (err) {
        console.error(err);
        toast({ title: "Error", description: "Failed to load issue details" });
      }
    };

    fetchIssue();
  }, [id, token]);

  if (!issue) return <div className="p-8">Loading issue...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      <div className="p-8">
        {/* Admin Button Centered */}
        <div className="flex justify-center mb-6">
          <Button variant="default">Admin</Button>
        </div>

        <h1 className="text-2xl font-bold mb-4">{issue.title}</h1>
        <p className="text-muted-foreground mb-2">{issue.description}</p>
        <p className="mb-2">
          Status: <strong>{issue.status}</strong>
        </p>
        <p className="mb-4">Created At: {new Date(issue.createdAt).toLocaleString()}</p>

        {/* Issue Image */}
        {issue.photoUrl && (
          <img
            src={issue.photoUrl}
            alt="Issue"
            className="mb-4 max-w-full max-h-96 w-auto h-auto rounded shadow object-cover"
          />
        )}

        {/* Map */}
        <div className="h-96 w-full">
          <MapContainer
            center={[issue.latitude, issue.longitude]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[issue.latitude, issue.longitude]}>
              <Popup>{issue.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
