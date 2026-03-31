import { motion } from 'framer-motion';

export default function SideNavbar() {
  return (
    <aside className="fixed left-8 top-0 h-screen w-16 flex flex-col justify-between py-10 items-center z-50">
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-28 h-28 rounded-full bg-white flex items-center justify-center p-2 shadow-sm ml-16"
      >
        <img 
          src="https://ykfromscratch.ca/wp-content/uploads/2025/08/cropped-From-scratch-Bakeshop-Logo.png" 
          alt="From Scratch Logo" 
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Vertical Nav Links - each rotated individually, stacked vertically */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center justify-center flex-1 gap-8 mt-8 mb-8"
      >
        <a
          href="#contacts"
          className="font-sans text-[11px] font-medium tracking-[0.25em] text-gray-500 uppercase hover:text-black transition-colors"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Contacts
        </a>

        <div className="flex flex-col items-center gap-3"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          <a
            href="#menu"
            className="font-sans text-[11px] font-bold tracking-[0.25em] text-black uppercase hover:text-gray-600 transition-colors"
          >
            Menu
          </a>
          <span className="w-1.5 h-1.5 rounded-full bg-black block" />
        </div>

        <a
          href="#reserve"
          className="font-sans text-[11px] font-medium tracking-[0.25em] text-gray-500 uppercase hover:text-black transition-colors"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Reserve A Table
        </a>
      </motion.nav>

      {/* Instagram Icon */}
      <motion.a 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        href="https://instagram.com" 
        className="text-gray-700 hover:text-black transition-colors mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </motion.a>
    </aside>
  );
}
