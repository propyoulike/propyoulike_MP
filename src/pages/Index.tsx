import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PropertyTypes from '@/components/PropertyTypes';
import HotSellingWidget from '@/components/HotSellingWidget';
import ApartmentsWidget from '@/components/ApartmentsWidget';
import VillasWidget from '@/components/VillasWidget';
import PlotsWidget from '@/components/PlotsWidget';
import TopBuilders from '@/components/TopBuilders';
import ProjectsByStage from '@/components/ProjectsByStage';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="space-y-8">
        <HeroSection />
        <PropertyTypes />
        <HotSellingWidget />
        <ApartmentsWidget />
        <VillasWidget />
        <PlotsWidget />
        <TopBuilders />
        <ProjectsByStage />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
