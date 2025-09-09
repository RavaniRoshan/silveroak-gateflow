import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SubjectsSection from "@/components/SubjectsSection";
import Footer from "@/components/Footer";
import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";

const Index = () => {
  return (
    <>
      <Header />
      <ScrollSmootherWrapper>
        <div className="min-h-screen bg-white dark:bg-black">
          <HeroSection />
          <FeaturesSection />
          <SubjectsSection />
          <Footer />
        </div>
      </ScrollSmootherWrapper>
    </>
  );
};

export default Index;
