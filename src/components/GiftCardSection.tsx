import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function GiftCardSection() {
  const { t } = useTranslation();
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#f8f4fa] overflow-hidden flex items-center justify-center">
      
      {/* Background Decor Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-[80px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#eadaeb] rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="relative max-w-[1200px] w-full px-8 z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="w-full md:w-1/2 flex justify-center order-2 md:order-1"
          >
            <div className="relative w-full max-w-[500px] aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
              {/* Decorative Frame */}
              <div className="absolute inset-0 border border-[#eadaeb] rounded-t-[150px] rounded-b-[40px] transform translate-x-4 -translate-y-4" />
              
              {/* Image Block */}
              <div className="absolute inset-0 rounded-t-[150px] rounded-b-[40px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(50,46,64,0.15)] bg-white">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src="/gift-card.png" 
                  alt="From Scratch Bakery Gift Card" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Little Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -right-6 md:-right-8 bg-white text-[#322e40] font-sans text-xs font-semibold tracking-widest uppercase px-6 py-4 rounded-full shadow-lg border border-[#f4ecf8] flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#cca9cd] animate-pulse" />
                {t('gift.badge')}
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text Container */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2"
          >
            <span className="font-sans font-semibold uppercase text-[10px] tracking-[0.4em] block mb-6 text-[#8e8d93]">
              {t('gift.subtitle')}
            </span>
            
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] text-[#322e40] leading-[1.1] mb-8 relative">
              <span className="font-serif">{t('gift.titlePart1')} </span><br />
              <span className="font-serif italic font-light drop-shadow-sm mr-2">{t('gift.titlePart2')}</span>
              <span className="font-serif italic font-light text-[#cca9cd]">{t('gift.titlePart3')}</span>
              
              <svg className="absolute -bottom-8 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-24 text-[#eadaeb] opacity-80" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10" />
              </svg>
            </h2>

            <div className="font-sans font-light text-[#676373] text-[15px] leading-[1.8] space-y-5 mb-10 text-justify md:text-left max-w-md">
              <p>
                {t('gift.desc1')}
              </p>
              <p>
                {t('gift.desc2')}
              </p>
            </div>

            <button className="group relative overflow-hidden bg-transparent border-2 border-[#322e40] text-[#322e40] rounded-sm px-10 py-4 font-sans text-[15px] font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-[#322e40] hover:text-white hover:shadow-[0_15px_30px_-10px_rgba(50,46,64,0.4)] hover:-translate-y-1 flex items-center gap-3">
              <span className="relative z-10">{t('gift.button')}</span>
              <svg 
                className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 relative z-10" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
