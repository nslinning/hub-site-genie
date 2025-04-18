
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AIIntegrationSection from "@/components/AIIntegrationSection";
import WorkflowSection from "@/components/WorkflowSection";
import WordPressIntegrationSection from "@/components/WordPressIntegrationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <AIIntegrationSection />
        <WorkflowSection />
        <WordPressIntegrationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
