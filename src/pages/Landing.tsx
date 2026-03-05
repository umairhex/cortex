import APIIntegrationSection from "@/components/landing/APIIntegrationSection";
import DashboardImageSection from "@/components/landing/DashboardImageSection";
import FAQ from "@/components/landing/FAQ";
import FeatureSteps from "@/components/landing/FeatureSteps";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import SupportedDatabases from "@/components/landing/SupportedDatabases";

const Landing = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar />
      <Hero />
      <DashboardImageSection />
      <FeatureSteps />
      <FeaturesGrid />
      <APIIntegrationSection />
      <SupportedDatabases />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Landing;
