import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";

// Fix Leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const ReportIssuePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // JWT token

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Get user's location
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      (err) => {
        console.error(err);
        alert("Location access denied.");
      }
    );
  }, []);

  // Upload image via backend
  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8080/api/imagekit/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const url = await res.text(); // Parse as text
      setPhotoUrl(url);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed");
    }
  };

  // Drag & drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;
      handleFileUpload(acceptedFiles[0]);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  // Submit issue
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || latitude === null || longitude === null) {
      alert("Please fill all fields and allow location access.");
      return;
    }

    setIsSubmitting(true);
    const userId = 1; // replace with actual logged-in user ID

    try {
      const res = await fetch(`http://localhost:8080/api/issues/${userId}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, latitude, longitude, photoUrl }),
      });

      if (!res.ok) throw new Error("Failed to report issue");

      alert("Issue reported successfully!");
      setTitle("");
      setDescription("");
      setPhotoUrl("");
    } catch (err) {
      console.error(err);
      alert("Error submitting issue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentPosition = latitude && longitude ? ([latitude, longitude] as [number, number]) : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Report New Issue</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div>
            <Label>Upload Image</Label>
            <div {...getRootProps()} className="border-2 border-dashed p-4 text-center cursor-pointer">
              <input {...getInputProps()} />
              {isDragActive
                ? "Drop image here..."
                : photoUrl
                ? "Image uploaded!"
                : "Drag & drop image here or click to select"}
            </div>
            {uploading && <p>Uploading image...</p>}
            {photoUrl && <p>Uploaded Image URL: {photoUrl}</p>}
          </div>

          <div>
            <Label>Location</Label>
            {currentPosition ? (
              <MapContainer center={currentPosition} zoom={15} style={{ height: 300, width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={currentPosition}>
                  <Popup>Your current location</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p>Fetching your location...</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Report Issue"}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default ReportIssuePage;
