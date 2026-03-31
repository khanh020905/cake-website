import { motion } from 'framer-motion';

export default function StorySection() {
  return (
    <section id="story" className="relative w-full flex flex-col lg:flex-row overflow-hidden bg-white mt-12 pb-24">
      
      {/* Left Full Bleed Image (Baker working) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        className="w-full lg:w-1/2 min-h-[500px] lg:min-h-[700px] xl:min-h-[800px] relative"
      >
        <img 
          src="/baker.png" 
          alt="Artisan Baker" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle warming overlay */}
        <div className="absolute inset-0 bg-black/5" />
      </motion.div>

      {/* Right Background Image with Overlay Card */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className="w-full lg:w-1/2 min-h-[600px] lg:min-h-[700px] relative flex items-center justify-center p-8 md:p-14 lg:p-20"
      >
        {/* Background Bakery Ambience Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1200&auto=format&fit=crop" 
            alt="Bakery Display" 
            className="w-full h-full object-cover opacity-80"
          />
          {/* Blur/Tone overlay so the text card pops organically */}
          <div className="absolute inset-0 bg-[#eadaeb]/20 backdrop-blur-[4px]" />
        </div>

        {/* Floating Story Text Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_30px_60px_-15px_rgba(50,46,64,0.15)] 
                     p-12 md:p-16 flex flex-col items-center text-center max-w-xl mx-auto border border-[#f8f4fa]"
        >
          {/* Elegant Titles */}
          <h2 className="flex flex-col items-center mb-8">
            <span className="font-serif text-[36px] md:text-[44px] tracking-[0.1em] text-[#322e40] leading-none mb-3 uppercase">
              From Scratch
            </span>
            {/* The beautiful cursive accent mimicking the screenshot but using our luxe style */}
            <span className="font-serif italic font-light text-[32px] md:text-[36px] text-[#cca9cd] capitalize">
              Always
            </span>
          </h2>

          {/* Minimal separation line */}
          <div className="w-16 h-[1px] bg-[#eadaeb] mb-8" />

          {/* Emotive Copywriting */}
          <div className="font-sans font-light text-[#676373] text-[14px] md:text-[15px] leading-[1.8] space-y-6 mb-12 text-justify md:text-center text-justify-last-center">
            <p>
              On April 15, 2024, From Scratch Bakeshop & Boba opened as an Asian-inspired bakery, created to bring those comforting flavours to the North. Everything we make is prepared from scratch in our kitchen, using thoughtfully sourced ingredients and time-honoured techniques—because in a place where seasons are long and days can be cold, care and patience matter.
            </p>
            <p>
              Here, baking is more than food. It's warmth on a winter morning, a familiar taste after a long day, and a small moment of comfort shared with others. From Scratch is our way of contributing to the North—offering something honest, handmade, and comforting, one bun and one pastry at a time.
            </p>
          </div>

          {/* Clean Outline Button to match the screenshot but modernized */}
          <button className="group relative overflow-hidden border border-[#322e40] text-[#322e40] rounded-sm px-10 py-3.5 
                             font-sans text-[14px] font-semibold tracking-widest uppercase transition-all duration-300 
                             hover:bg-[#322e40] hover:text-white hover:shadow-[0_15px_30px_-10px_rgba(50,46,64,0.4)] hover:-translate-y-1">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Order Online
              <svg className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </motion.div>

    </section>
  );
}
