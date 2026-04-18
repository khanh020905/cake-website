import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function CateringSection() {
  const { t } = useTranslation();
  return (
    <section id="catering" className="relative w-full bg-[#f8f4fa] py-24 lg:py-32 px-6 md:px-12 overflow-hidden border-t border-[#eadaeb]/50">
      
      {/* Decorative background glow to break up solid color */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#ffffff] rounded-full mix-blend-overlay opacity-40 blur-3xl pointer-events-none" />

      <div className="max-w-[1250px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12 relative z-10">
        
        {/* Left Side: Editorial Typography & Call to Action */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Main Title Grouping */}
          <h2 className="flex flex-col mb-8 w-full">
            <span className="font-serif text-[42px] md:text-[50px] lg:text-[54px] leading-[1.1] text-[#322e40] uppercase tracking-wide mb-2 sm:mb-4">
              {t('catering.title1').split('&').map((part, i, arr) => (
                 <span key={i}>{part}{i < arr.length - 1 && <>&amp;<br className="hidden md:block" /></>}</span>
              ))}
            </span>
            <span className="font-serif italic font-light text-[#cca9cd] lowercase text-[50px] md:text-[68px] leading-[0.8]">
              {t('catering.title2')}
            </span>
          </h2>
          
          {/* Elegant Subtitle Divider */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-12 w-full max-w-sm lg:max-w-none">
            <div className="h-[1px] flex-1 bg-[#cca9cd]/40 hidden sm:block" />
            <span className="font-sans font-semibold text-[11px] md:text-[13px] tracking-[0.2em] text-[#cca9cd] uppercase whitespace-normal sm:whitespace-nowrap px-4 sm:px-0">
              {t('catering.subtitle')}
            </span>
            <div className="h-[1px] flex-1 bg-[#cca9cd]/40 hidden lg:block" />
          </div>

          {/* Luxury Contact Button */}
          <button className="group relative overflow-hidden border border-[#322e40] bg-transparent text-[#322e40] rounded-sm px-14 py-4 
                             font-sans text-[15px] md:text-[16px] font-semibold tracking-wide transition-all duration-400 
                             hover:bg-[#322e40] hover:text-white hover:shadow-xl hover:-translate-y-1">
            <span className="relative z-10 transition-colors duration-400">{t('catering.button')}</span>
          </button>
        </motion.div>

        {/* Right Side: High-End Magazine Photo Collage */}
        <div className="w-full lg:w-7/12 relative h-[500px] sm:h-[600px] mt-8 lg:mt-0 flex justify-end">
          
          {/* Primary Feature Image: Pastry Box (Top Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-0 right-0 w-[85%] sm:w-[75%] h-[85%] rounded-[8px] md:rounded-[12px] overflow-hidden shadow-2xl z-10 bg-white"
          >
            <div className="absolute inset-0 bg-black/5 transition-colors duration-500 hover:bg-transparent z-10 pointer-events-none" />
            <img 
              src="/catering-donuts.jpg" 
              alt="Catering Pastry Box Assortment" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </motion.div>

          {/* Secondary Overlapping Image: Kraft Box Stack (Bottom Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-0 left-0 w-[60%] aspect-square rounded-[8px] md:rounded-[12px] overflow-hidden shadow-[0_25px_50px_-15px_rgba(50,46,64,0.35)] border-[8px] md:border-[16px] border-[#f8f4fa] z-20 bg-white group cursor-pointer"
          >
            <img 
              src="/catering-boxes.jpg" 
              alt="Stacked Kraft Catering Boxes" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
