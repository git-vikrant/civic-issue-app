import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        
        <Hero />
      </main>
    </div>
  );
};

export default HomePage;