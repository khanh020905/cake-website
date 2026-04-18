import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import menuDataRaw from '../data/merged_menu.json';

interface MenuItem {
  name: string;
  price: string;
  image_url: string;
  description: string;
  localImage: string;
  category?: string;
}

const menuData: MenuItem[] = menuDataRaw.items;

const categories = [
  { id: 'all', name: 'All Menu' },
  { id: 'Asian Buns', name: 'Asian Buns' },
  { id: 'Western Pastries', name: 'Western Pastries' },
  { id: 'Bubble Milk Tea', name: 'Bubble Milk Tea' },
  { id: 'Seasonal Items', name: 'Seasonal Items' }
];

export const MenuGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  // Progressive Rendering: Reset chunk size on filter change
  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, searchQuery]);

  const filteredItems = menuData.filter((item) => {
    // Only show items that have images
    if (!item.localImage) return false;

    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  }).sort((a, b) => {
    if (a.localImage && !b.localImage) return -1;
    if (!a.localImage && b.localImage) return 1;
    return 0;
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isCategoryLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < filteredItems.length) {
        // Use a short timeout to prevent rapid firing multiple times instantly
        setTimeout(() => setVisibleCount(prev => prev + 12), 100);
      }
    });

    if (node) observer.current.observe(node);
  }, [isCategoryLoading, visibleCount, filteredItems.length]);

  return (
    <div className="bg-[#FAFAFA] flex flex-col md:flex-row min-h-screen overflow-hidden">
      {/* Header/Close Button (Mobile) */}
      <div className="absolute top-6 right-6 z-50 md:hidden">
        <Link 
          to="/"
          className="p-3 bg-white hover:bg-black hover:text-white transition-colors duration-300 rounded-full shadow-lg border border-[#F4B5B7]/30 flex items-center justify-center"
        >
          <ArrowLeft size={24} />
        </Link>
      </div>

      {/* Sidebar / Top Navigation */}
      <div className="w-full md:w-80 lg:w-96 flex-shrink-0 bg-white border-b md:border-b-0 md:border-r border-[#F4B5B7]/20 p-8 flex flex-col justify-between overflow-y-auto h-auto md:h-screen z-10 pt-20 md:pt-16 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="hidden md:flex mb-6">
              <Link to="/" className="text-gray-400 hover:text-black flex items-center gap-2 font-sans tracking-wide text-sm transition-colors">
                <ArrowLeft size={16} /> Back to Home
              </Link>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl text-black font-light tracking-tight mb-8">
              Menu<span className="text-[#DEACD0]">.</span>
            </h2>
            <div className="relative mb-10 w-full md:w-11/12 group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
              <input 
                type="text" 
                placeholder="Search our selection..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 pl-12 pr-4 bg-[#FAFAFA] border border-gray-100 rounded-full focus:outline-none focus:border-[#F4B5B7] focus:ring-1 focus:ring-[#F4B5B7] transition-all font-sans text-sm shadow-sm"
              />
            </div>
          </motion.div>

          <div className="flex md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar px-1 -mx-1">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.05) }}
                onClick={() => {
                  if (activeCategory === cat.id) return;
                  setIsCategoryLoading(true);
                  setActiveCategory(cat.id);
                  setTimeout(() => setIsCategoryLoading(false), 600);
                }}
                className={`flex-shrink-0 text-left px-6 py-4 rounded-2xl transition-all duration-500 font-sans text-sm tracking-wide ${
                  activeCategory === cat.id 
                    ? 'bg-black text-white shadow-xl shadow-black/10 scale-100 font-medium' 
                    : 'text-gray-500 hover:text-black hover:bg-[#F4B5B7]/10 hover:scale-[1.02]'
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="hidden md:block mt-16 pb-8">
          <p className="font-serif italic text-gray-400 text-sm">
            Baked fresh daily. Subject to availability.
          </p>
          <a 
            href="https://from-scratch-bakeshop-boba.square.site/s/order?location=LYB17NEAF81R6&menu=#UXSAQDWUG4ENYRU6OTRUC4VD" 
            target="_blank" 
            rel="noreferrer"
            className="mt-6 inline-block w-full text-center py-4 bg-[#13a251] text-white rounded-full font-medium tracking-wide hover:bg-[#0f8b44] transition-colors shadow-lg shadow-[#13a251]/20"
          >
            Order on Square
          </a>
        </div>
      </div>

      {/* Grid View */}
      <div className="flex-1 overflow-y-auto bg-[#FAFAFA] p-4 md:p-12 lg:p-16 h-screen relative" id="menu-grid-container">
        {isCategoryLoading ? (
          <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center text-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-[3px] border-[#F4B5B7]/30 border-t-[#F4B5B7] rounded-full mb-6"
              />
              <p className="font-serif italic text-gray-500 text-lg">Fetching menu...</p>
              <p className="text-gray-400 font-sans text-sm mt-2">Preparing fresh items for you</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 auto-rows-max pb-24 md:pb-12">
              <AnimatePresence mode="popLayout">
                {filteredItems.slice(0, visibleCount).map((item, index) => {
                  const isLastItem = index === visibleCount - 1;
                  return (
                    <motion.div
                      ref={isLastItem ? lastElementRef : null}
                      key={item.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: Math.min((index % 12) * 0.04, 0.2) }}
                      className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] box-border flex flex-col h-full border border-gray-50 transition-shadow duration-500"
                    >
                      <div className="relative aspect-square overflow-hidden bg-gray-50">
                        {item.localImage ? (
                          <motion.img 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            src={item.localImage} 
                            alt={item.name} 
                            className="w-full h-full object-cover origin-center"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 font-serif italic bg-gradient-to-br from-[#F4B5B7]/10 to-[#DEACD0]/10">
                            {item.name.charAt(0)}
                          </div>
                        )}
                        
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                          <span className="font-serif font-medium text-black">{item.price || "Contact"}</span>
                        </div>
                      </div>
                      
                      <div className="p-6 md:p-8 flex flex-col flex-1">
                        <h3 className="font-serif text-xl text-black mb-3 leading-tight">{item.name}</h3>
                        {item.description && (
                          <p className="text-gray-500 text-sm font-sans font-light leading-relaxed flex-1 line-clamp-4">
                            {item.description}
                          </p>
                        )}
                        
                        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Add to Cart</span>
                          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
            
            {visibleCount < filteredItems.length && !isCategoryLoading && (
              <div className="w-full py-12 flex justify-center opacity-50">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            )}
            
            {filteredItems.length === 0 && (
              <div className="w-full h-64 flex flex-col items-center justify-center text-center">
                <p className="font-serif text-2xl text-gray-400 mb-2">No items found</p>
                <p className="text-gray-400 font-sans">Try adjusting your search or category.</p>
              </div>
            )}
          </>
        )}
        
        {/* Mobile Order Button Fixed to Bottom */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50">
            <a 
            href="https://from-scratch-bakeshop-boba.square.site/s/order?location=LYB17NEAF81R6&menu=#UXSAQDWUG4ENYRU6OTRUC4VD" 
            target="_blank" 
            rel="noreferrer"
            className="block w-full text-center py-4 bg-black text-white rounded-full font-medium tracking-wide shadow-2xl"
          >
            Order Online
          </a>
        </div>
      </div>
    </div>
  );
};

// Add standard styles for custom scrollbar masking in CSS
const style = document.createElement('style');
style.innerHTML = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);
