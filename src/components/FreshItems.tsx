import { motion } from 'framer-motion';

const items = [
  {
    id: 1,
    title: "Asian Buns & Western Pastries",
    // Stunning high-res editorial photo of fresh crusty buns/bread
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    delay: 0.2
  },
  {
    id: 2,
    title: "Bubble Tea & Hot Drinks",
    // Custom generated high-end editorial Boba Tea photography
    image: "/boba-tea.png",
    delay: 0.4
  },
  {
    id: 3,
    title: "Seasonal Items",
    // Elegant artistic shot of a delicate pastry/tart
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=800&auto=format&fit=crop",
    delay: 0.6
  }
];

export default function FreshItems() {
  return (
    <section id="menu" className="relative w-full py-32 bg-white flex flex-col items-center overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#eadaeb]/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#eadaeb]/50 to-transparent" />

      <div className="relative max-w-[1200px] w-full px-8 z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-[56px] text-[#322e40] tracking-wide relative inline-block">
            <span className="font-sans font-semibold uppercase text-[10px] tracking-[0.4em] block mb-8 text-[#8e8d93]">
              From the kitchen
            </span>
            <span className="font-serif">All Items Made </span>
            <span className="font-serif italic font-light drop-shadow-sm">Fresh Daily</span>
            
            {/* Elegant curvy underline decoration matching the curvy hero text vibe */}
            <svg className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 text-[#eadaeb] opacity-80" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10" />
            </svg>
          </h2>
        </motion.div>

        {/* Expanding Accordion Gallery (Pure CSS Flex Animation) */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 justify-center w-full h-auto md:h-[600px] items-stretch group/container mt-8">
          {items.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: item.delay }}
              className="relative flex flex-col group/card cursor-pointer h-[450px] md:h-full 
                         transition-[width,border-radius,shadow] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                         w-full md:w-[33.33%] md:group-hover/container:w-[25%] md:hover:!w-[50%]"
            >
              {/* Image Container with Dynamic Arch Shape morphing to Square */}
              <div className="relative w-full flex-1 overflow-hidden 
                              rounded-t-[100px] md:rounded-t-[300px] rounded-b-2xl
                              shadow-[0_20px_40px_-15px_rgba(50,46,64,0.1)] 
                              transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                              group-hover/card:shadow-[0_25px_50px_-15px_rgba(50,46,64,0.15)] 
                              group-hover/card:!rounded-[16px] mb-6
                              transform-gpu isolate"
                   style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover/card:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
                
                {/* Image */}
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title Section (Fixed Height to prevent layout jumping) */}
              <div className="h-[100px] w-full flex items-start justify-center overflow-hidden px-4 md:px-2">
                <h3 className="font-serif text-[24px] lg:text-[28px] text-[#322e40] text-center leading-[1.25] 
                               transition-colors duration-300 drop-shadow-sm
                               group-hover/card:text-[#a5a3a8]">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- See Menu Button --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex justify-center mt-10 md:mt-16"
        >
          <button className="group relative overflow-hidden bg-[#322e40] text-white rounded-sm px-14 py-4 font-sans text-[18px] md:text-[20px] font-medium tracking-wide transition-all duration-300 hover:shadow-[0_15px_30px_-10px_rgba(50,46,64,0.4)] hover:-translate-y-1">
            <span className="relative z-10">See Menu</span>
            <div className="absolute inset-0 h-full w-full bg-[#f8f4fa] opacity-0 transition-opacity duration-300 group-hover:opacity-15 z-0"></div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
