import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SubjectsSection from "@/components/SubjectsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <SubjectsSection />
      <Footer />
    </div>
  );
};

export default Index;
