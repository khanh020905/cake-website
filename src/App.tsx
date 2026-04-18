import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FreshItems from './components/FreshItems';
import GiftCardSection from './components/GiftCardSection';
import StorySection from './components/StorySection';
import CateringSection from './components/CateringSection';
import VisitUsSection from './components/VisitUsSection';
import Footer from './components/Footer';
import { MenuGallery } from './components/MenuGallery';

function HomePage() {
  return (
    <div className="font-sans antialiased bg-lavender-100 min-h-screen flex">
      <Navbar />
      <div className="w-full flex-1">
        <Hero />
        <FreshItems />
        <GiftCardSection />
        <StorySection />
        <CateringSection />
        <VisitUsSection />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
