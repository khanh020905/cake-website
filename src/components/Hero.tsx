import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative w-full h-[100dvh] bg-[#f8f4fa] flex items-center justify-center overflow-hidden">
      {/* Subtle Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay z-0"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* Subtle Dot Grid Texture (Top Right) */}
      <div
        className="absolute top-[10%] right-[10%] w-[150px] h-[150px] opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#322e40 1.5px, transparent 1.5px)",
          backgroundSize: "15px 15px",
        }}
      />

      {/* Main Container (Perfectly scales the absolute layout down for smaller monitors/devices) */}
      <div
        className="relative w-[1400px] h-[900px] flex-shrink-0 transform transition-transform duration-300 origin-center
                      scale-[0.25] sm:scale-[0.4] md:scale-[0.55] lg:scale-[0.7] xl:scale-[0.85] 2xl:scale-100"
      >
        {/* === Left Item: Citrus Tart === */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-[-40%] sm:top-[18%] left-[22%] sm:left-[5%] w-[500px] scale-[1.8] sm:scale-100 origin-center"
        >
          {/* Circular Text */}
          <svg
            viewBox="0 0 1000 1000"
            className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-[48%] w-[1000px] h-[1000px] z-0 pointer-events-none"
          >
            {/* r=280, cx=500, cy=500. Path starts at 6 o'clock (500,780) */}
            <path
              id="textCircleLeft"
              d="M 500, 780 A 280, 280 0 1, 1 500, 220 A 280, 280 0 1, 1 500, 780"
              fill="none"
            />
            <text
              className="font-serif italic fill-[#322e40]"
              style={{
                fontSize: "95px",
                letterSpacing: "6px",
                fontWeight: 300,
              }}
            >
              <textPath href="#textCircleLeft" startOffset="15%">
                {t("hero.tartName")}
              </textPath>
            </text>
          </svg>

          {/* White Plate + Image */}
          <div className="relative z-10 w-[480px] h-[480px] rounded-full bg-white mx-auto flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-[360px] h-[360px] rounded-full overflow-hidden shadow-2xl"
            >
              <img
                src="/donut-final.png"
                alt="Donut"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Description Block */}
          {/* Tucked tight against bottom left corner on desktop, shifted right on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-[-140px] sm:bottom-[-140px] left-[520px] sm:left-[100px] max-w-[260px]"
          >
            <div className="font-serif text-[42px] text-[#322e40] mb-2 italic">
              {t("hero.tartPrice")}
            </div>
            <p className="font-sans text-[8.5px] leading-[1.8] tracking-[0.14em] text-[#8e8d93] uppercase font-bold">
              {t("hero.tartDesc")}
            </p>
          </motion.div>
        </motion.div>

        {/* === Right Item: Raspberry Yogurt === */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-[130%] sm:top-[44%] right-[24%] sm:right-[10%] w-[580px] scale-[1.8] sm:scale-100 origin-center"
        >
          {/* Circular Text */}
          <svg
            viewBox="0 0 1100 1100"
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] z-0 pointer-events-none"
          >
            {/* r=320, cx=550, cy=550. */}
            <path
              id="textCircleRight"
              d="M 550, 870 A 320, 320 0 1, 1 550, 230 A 320, 320 0 1, 1 550, 870"
              fill="none"
            />
            <text
              className="font-serif italic fill-[#322e40]"
              style={{
                fontSize: "110px",
                letterSpacing: "8px",
                fontWeight: 300,
              }}
            >
              <textPath href="#textCircleRight" startOffset="20%">
                {t("hero.yogurtName")}
              </textPath>
            </text>
          </svg>

          {/* White Plate + Image */}
          <div className="relative z-10 w-[530px] h-[530px] rounded-full bg-white mx-auto flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-[400px] h-[400px] rounded-full overflow-hidden shadow-2xl"
            >
              <img
                src="/milk-tea.png"
                alt="Milk Tea"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Description Block */}
          {/* Positioned between the two plates, slightly above yogurt center */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-[-340px] sm:top-[-340px] left-[-80px] sm:left-[-20px] md:left-[0px] max-w-[280px]"
          >
            <div className="font-serif text-[44px] text-[#322e40] mb-2 italic">
              {t("hero.yogurtPrice")}
            </div>
            <p className="font-sans text-[8.5px] leading-[1.8] tracking-[0.14em] text-[#8e8d93] uppercase font-bold">
              {t("hero.yogurtDesc")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
