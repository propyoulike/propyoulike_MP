import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PropertyTypes from '@/components/PropertyTypes';
import PropertyListings from '@/components/PropertyListings';
import TopBuilders from '@/components/TopBuilders';
import ProjectsByStage from '@/components/ProjectsByStage';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PropertyTypes />
        <PropertyListings />
        <TopBuilders />
        <ProjectsByStage />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};
//        <StatsSection />

export default Index;
