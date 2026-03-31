import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FreshItems from './components/FreshItems';
import StorySection from './components/StorySection';
import CateringSection from './components/CateringSection';
import VisitUsSection from './components/VisitUsSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans antialiased bg-lavender-100 min-h-screen flex">
      <Navbar />
      <div className="w-full flex-1">
        <Hero />
        <FreshItems />
        <StorySection />
        <CateringSection />
        <VisitUsSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
