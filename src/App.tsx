import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FreshItems from './components/FreshItems';
import GiftCardSection from './components/GiftCardSection';
import StorySection from './components/StorySection';
import CateringSection from './components/CateringSection';
import VisitUsSection from './components/VisitUsSection';
import Footer from './components/Footer';
import { MenuGallery } from './components/MenuGallery';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <MenuGallery isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <div className="font-sans antialiased bg-lavender-100 min-h-screen flex">
        <Navbar onMenuClick={() => setIsMenuOpen(true)} />
        <div className="w-full flex-1">
          <Hero />
          <FreshItems onMenuClick={() => setIsMenuOpen(true)} />
          <GiftCardSection />
          <StorySection />
          <CateringSection />
          <VisitUsSection />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
