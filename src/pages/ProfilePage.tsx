import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserDTO {
  id: number;
  username: string;
  email: string;
  phone?: string;
  photoUrl?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8080/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data: UserDTO = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setMessage("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user || !token) return;
    setUpdating(true);
    setMessage(null);
    try {
      const res = await fetch("http://localhost:8080/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated: UserDTO = await res.json();
      setUser(updated);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p className="p-4">Loading profile...</p>;
  if (!user) return <p className="p-4">User not found</p>;

  const initials = user.username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-md mx-auto p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        {/* Centered Avatar */}
        <Avatar className="mb-4 h-24 w-24">
          {user.photoUrl ? (
            <AvatarImage src={user.photoUrl} alt={user.username} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>

        {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

        <div className="w-full space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
            />
          </div>

          <Button onClick={handleUpdate} disabled={updating} className="w-full">
            {updating ? "Updating..." : "Update Profile"}
          </Button>

          <Button onClick={handleLogout} variant="destructive" className="w-full mt-2">
            Logout
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
