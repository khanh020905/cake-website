import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-[#322e40] text-white pt-24 pb-8 px-6 md:px-12 rounded-t-[40px] mt-[-40px] relative z-20 overflow-hidden flex flex-col">
      <div className="max-w-[1250px] mx-auto w-full flex-1">
        
        {/* Superior Newsletter UI */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-end mb-24 lg:mb-32 gap-12">
          
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="font-serif text-[38px] md:text-[50px] leading-tight mb-4">
              {t('footer.title1')} <span className="italic text-[#cca9cd] font-light">{t('footer.title2')}</span>
            </h3>
            <p className="font-sans font-light text-white/70 text-[15px] md:text-[16px] tracking-wide leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          <div className="w-full lg:w-[450px]">
            <form className="relative w-full group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t('footer.placeholder')} 
                className="w-full bg-transparent border-b border-white/20 pb-4 text-[16px] font-sans font-light outline-none text-white placeholder-white/40 
                           focus:border-[#cca9cd] transition-colors duration-400 pr-12 peer"
                required
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 text-white/40 group-hover:text-white peer-focus:text-[#cca9cd] transition-colors duration-400 hover:-translate-y-0.5"
              >
                <ArrowRight size={24} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

        {/* Links & Info Minimal Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-20 items-start text-center md:text-left">
          
          {/* Column 1 */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="font-sans font-semibold text-[12px] tracking-[0.25em] uppercase text-[#cca9cd] mb-3">{t('footer.visit')}</h4>
            <span className="font-light text-white/70 text-[15px] leading-relaxed">
              Centre Square Mall<br />
              Yellowknife, Northwest Territories<br />
              X1A 3R6
            </span>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="font-sans font-semibold text-[12px] tracking-[0.25em] uppercase text-[#cca9cd] mb-3">{t('footer.contact')}</h4>
            <a href="mailto:ykfromscratch2024@gmail.com" className="font-light text-white/70 text-[15px] hover:text-[#cca9cd] transition-colors duration-300 block pb-1 border-b border-transparent hover:border-[#cca9cd]/30">
              ykfromscratch2024@gmail.com
            </a>
            <span className="font-light text-white/70 text-[15px]">(867) 686-9986</span>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="font-sans font-semibold text-[12px] tracking-[0.25em] uppercase text-[#cca9cd] mb-3">{t('footer.follow')}</h4>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/70 hover:text-white hover:-translate-y-1 transition-all duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white hover:-translate-y-1 transition-all duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

        </div>
      </div>
        
      {/* Massive Full-bleed Typography Background / Footer Bottom */}
      <div className="w-full pt-8 flex flex-col items-center relative">
        {/* Massive watermark */}
        <div className="w-full absolute bottom-[-10%] md:bottom-[-20%] left-0 flex justify-center overflow-hidden pointer-events-none select-none z-0 opacity-40">
           <h1 className="font-serif text-[16vw] md:text-[18vw] leading-none text-white/[0.03] font-bold tracking-tighter uppercase whitespace-nowrap">
             FROM SCRATCH
           </h1>
        </div>

        {/* Functional bottom row */}
        <div className="w-full max-w-[1250px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-white/40 font-sans font-light text-[11px] tracking-widest uppercase relative z-10 
                        border-t border-white/10 pt-8 pb-4">
          <span>&copy; {new Date().getFullYear()} From Scratch Bakeshop.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors duration-300">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors duration-300">{t('footer.terms')}</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
