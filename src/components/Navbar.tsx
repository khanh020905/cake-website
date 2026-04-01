import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { t, i18n } = useTranslation();
  
  // Condense the nav slightly on scroll for a premium feel
  const navHeight = useTransform(scrollY, [0, 100], [100, 80]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      style={{ height: navHeight }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center px-6 md:px-12
                  ${scrolled ? 'backdrop-blur-md shadow-sm border-b border-[#eadaeb]/50' : 'bg-transparent'}`}
    >
      {/* Dynamic Background Overlay */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-white z-[-1]"
      />

      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between relative">
        
        {/* Left: Brand Logo */}
        <div className="flex-shrink-0 flex items-center">
          <motion.div 
            style={{ scale: logoScale }}
            className="w-24 md:w-24 h-24 md:h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center p-1.5 shadow-sm border border-[#eadaeb]/50 cursor-pointer origin-left"
          >
            <img 
              src="https://ykfromscratch.ca/wp-content/uploads/2025/08/cropped-From-scratch-Bakeshop-Logo.png" 
              alt="From Scratch Logo" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {[
            { name: t("nav.menu"), href: "#menu", onClick: onMenuClick },
            { name: t("nav.story"), href: "#story" },
            { name: t("nav.catering"), href: "#catering" },
            { name: t("nav.contacts"), href: "#contacts" }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={item.onClick ? (e) => {
                e.preventDefault();
                item.onClick!();
              } : undefined}
              className="font-sans text-[12px] font-semibold tracking-[0.2em] text-[#322e40] uppercase 
                         hover:text-[#cca9cd] transition-colors relative group py-2"
            >
              {item.name}
              {/* Animated underline effect */}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#cca9cd] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          
          {/* Language Toggle */}
          <div className="flex items-center gap-1.5 md:gap-2 font-sans font-semibold text-[11px] md:text-[12px] tracking-widest">
            <button 
              onClick={() => i18n.changeLanguage('en')}
              className={`transition-colors uppercase ${i18n.language === 'en' ? 'text-[#322e40]' : 'text-[#8e8d93] hover:text-[#cca9cd]'}`}
            >EN</button>
            <span className="text-[#eadaeb]">|</span>
            <button 
              onClick={() => i18n.changeLanguage('fr')}
              className={`transition-colors uppercase ${i18n.language === 'fr' ? 'text-[#322e40]' : 'text-[#8e8d93] hover:text-[#cca9cd]'}`}
            >FR</button>
          </div>

          <a href="https://instagram.com" target="_blank" rel="noreferrer" 
             className="text-[#322e40] hover:text-[#cca9cd] transition-colors hidden lg:block">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          
          <a 
            href="https://from-scratch-bakeshop-boba.square.site/?location=LYB17NEAF81R6&menu=#most-popular" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#322e40] text-white px-2.5 sm:px-5 md:px-6 py-2 md:py-2.5 rounded-sm font-sans text-[9.5px] sm:text-[11px] md:text-[12px] font-semibold tracking-wider md:tracking-widest uppercase
                       hover:bg-[#cca9cd] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            {t("nav.orderOnline")}
          </a>
          
          {/* Hamburger Icon for Mobile */}
          <button 
            className="md:hidden text-[#322e40] hover:text-[#cca9cd] transition-colors p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white shadow-xl shadow-[#322e40]/10 border-t border-[#eadaeb]/50 py-8 px-6 md:hidden flex flex-col gap-6 items-center"
        >
          {[
            { name: t("nav.menu"), href: "#menu", onClick: onMenuClick },
            { name: t("nav.story"), href: "#story" },
            { name: t("nav.catering"), href: "#catering" },
            { name: t("nav.contacts"), href: "#contacts" }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
                setMobileMenuOpen(false);
              }}
              className="font-sans text-[13px] font-semibold tracking-[0.2em] text-[#322e40] uppercase hover:text-[#cca9cd] transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="w-12 h-[1px] bg-[#eadaeb] my-2" />
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#322e40] hover:text-[#cca9cd] transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
        </motion.div>
      )}

    </motion.header>
  );
}
