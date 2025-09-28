import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { FileText, Home, MessageSquare, Shield, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const role = localStorage.getItem("role"); // 'ADMIN' or 'USER'

  return (
    <nav className="bg-background border-b border-border shadow-professional-sm sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-executive rounded-lg flex items-center justify-center shadow-professional-sm">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground font-playfair">CivicReport</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                isActive("/") ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            <Link
              to="/report"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                isActive("/report") ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Issues
            </Link>
            {role === "ADMIN" && (
              <Link
                to="/admin"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                  isActive("/admin") ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Link>
            )}
          </div>

          {/* Profile + Hamburger */}
          <div className="flex items-center space-x-4">
            <Button asChild variant="executive" size="sm" className="shadow-professional-sm hidden md:flex">
              <Link to="/profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </Button>

            {/* Hamburger for Mobile */}
            <button
              className="md:hidden p-2 rounded hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 text-base font-medium transition-colors ${
                isActive("/") ? "text-primary bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Home className="w-4 h-4 inline mr-2" />
              Home
            </Link>
            <Link
              to="/report"
              className={`block px-3 py-2 text-base font-medium transition-colors ${
                isActive("/report") ? "text-primary bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Issues
            </Link>
            {role === "ADMIN" && (
              <Link
                to="/admin"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/admin") ? "text-primary bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Shield className="w-4 h-4 inline mr-2" />
                Admin
              </Link>
            )}
            <Link
              to="/profile"
              className={`block px-3 py-2 text-base font-medium transition-colors ${
                isActive("/profile") ? "text-primary bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
