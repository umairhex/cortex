import { Hero } from "@/components/shared/Hero";
import { Navbar } from "@/components/shared/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
