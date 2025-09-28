import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, MapPin, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-background py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-accent/20" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-primary/10 text-primary mb-8">
            <Users className="w-4 h-4 mr-2" />
            Community-Powered Solutions
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight font-playfair">
            Report. Track. Resolve
            <br />
            <span className="bg-gradient-executive bg-clip-text text-transparent">
              Civic Issues Together
            </span>
          </h1>

          {/* Subtitle */}
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed font-inter">
            Empower your community by reporting local issues, tracking their progress, 
            and working together to create positive change in your neighborhood.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button asChild variant="hero" size="lg" className="shadow-professional-glow">
              <Link to="/login">
                Login to Report
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 hover:shadow-professional-md">
              <Link to="/report">View Issues</Link>
            </Button>
          </div>

          {/* Stats/Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-primary">Location-Based</h3>
              <p className="text-muted-foreground">
                Report issues with precise location data for faster resolution
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-primary">Track Progress</h3>
              <p className="text-muted-foreground">
                Follow your reported issues from submission to resolution
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-primary">Community Driven</h3>
              <p className="text-muted-foreground">
                Work together with neighbors and local authorities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;