import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { GestureHandling } from 'leaflet-gesture-handling';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';

// Fix for React-Leaflet marker icon missing in Vite builds
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Register the GestureHandling plugin to Leaflet manually
L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);

// Custom map pin icon using our theme color
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to dynamically enable gesture handling on the map instance
function MapGesturePlugin() {
  const map = useMap();
  useEffect(() => {
    if (map && (map as any).gestureHandling) {
      (map as any).gestureHandling.enable();
    }
  }, [map]);
  return null;
}

export default function VisitUsSection() {
  const { t } = useTranslation();
  // Approximate coordinates for Centre Square Mall, Yellowknife
  const position: [number, number] = [62.4540, -114.3718]; 
  
  return (
    <section id="contacts" className="relative w-full bg-white py-24 lg:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1250px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-16 items-start">
        
        {/* Left Side: Premium Interactive Satellite Map */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 h-[500px] md:h-[650px] rounded-[16px] md:rounded-[24px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(50,46,64,0.15)] bg-[#2b2b2b] z-10 
                     border-[8px] md:border-[12px] border-[#f8f4fa] relative isolate"
        >
          {/* High-Resolution Satellite Tiles equivalent to Google Maps Satellite */}
          {/* Note: gestureHandling={true} triggers the 'Use ctrl + scroll to zoom' overlay via the plugin */}
          <MapContainer 
            center={position} 
            zoom={16} 
            scrollWheelZoom={false} 
            className="w-full h-full z-0 outline-none"
            zoomControl={true}
            // @ts-ignore - Leaflet custom options passed down
            gestureHandling={true}
          >
            <MapGesturePlugin />
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              attribution='&copy; Google Maps'
              maxZoom={20}
            />
            {/* Custom Marker */}
            <Marker position={position} icon={customIcon}>
              <Popup className="font-sans font-medium text-[#322e40]">
                From Scratch Bakeshop & Boba
              </Popup>
            </Marker>
          </MapContainer>
          
          {/* Map Edge Shadow */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] rounded-[12px] z-[400]" />
        </motion.div>

        {/* Right Side: Information Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col items-start lg:pl-4"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="w-14 h-14 rounded-full bg-[#f8f4fa] flex items-center justify-center text-[#cca9cd] shadow-inner border border-[#eadaeb]/30">
              <MapPin size={26} strokeWidth={2} />
            </span>
            <h2 className="font-serif text-[42px] md:text-[54px] text-[#322e40] uppercase tracking-wider leading-none">
              {t('visit.title')}
            </h2>
          </div>

          {/* Elevated Address Block */}
          <div className="w-full bg-white rounded-2xl p-8 sm:p-10 shadow-[0_20px_40px_-20px_rgba(50,46,64,0.1)] border border-[#eadaeb]/60 mb-12">
            <h3 className="font-serif font-medium text-[22px] md:text-[24px] text-[#322e40] mb-5">{t('visit.mall')}</h3>
            <p className="font-light font-sans text-[15px] md:text-[16px] text-[#676373] leading-[1.8] mb-8">
              {t('visit.address1')}<br />
              {t('visit.address2')}<br />
              {t('visit.address3')}
            </p>
            
            <div className="flex flex-col gap-4 font-sans font-light text-[15px] md:text-[16px] text-[#676373]">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f8f4fa] flex items-center justify-center">
                  <Phone size={14} className="text-[#cca9cd]" />
                </div>
                <span>(867) 686-9986</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f8f4fa] flex items-center justify-center">
                  <Mail size={14} className="text-[#cca9cd]" />
                </div>
                <a href="mailto:ykfromscratch2024@gmail.com" className="hover:text-[#322e40] transition-colors decoration-[#cca9cd]/50 underline underline-offset-4">
                  ykfromscratch2024@gmail.com
                </a>
              </div>
            </div>

            {/* Premium Button fixing the ugly orange button from screenshot */}
            <a 
              href="https://maps.google.com/?q=From+Scratch+Bakeshop+Yellowknife+Centre+Square+Mall" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 group relative overflow-hidden bg-[#322e40] text-white rounded-sm px-10 py-4 
                         font-sans text-[14px] md:text-[15px] font-semibold tracking-widest uppercase transition-all duration-400 
                         hover:shadow-[0_15px_30px_-10px_rgba(50,46,64,0.4)] hover:-translate-y-1"
            >
              <span className="relative z-10 transition-colors duration-400">{t('visit.button')}</span>
              <div className="absolute inset-0 h-full w-full bg-[#f8f4fa] opacity-0 transition-opacity duration-300 group-hover:opacity-15 z-0" />
            </a>
          </div>

          {/* Luxury Hours Table */}
          <div className="w-full mt-4">
            <div className="flex items-center gap-4 mb-6 px-2">
              <Clock size={20} className="text-[#cca9cd]" strokeWidth={2} />
              <h3 className="font-serif text-[22px] text-[#322e40] uppercase tracking-widest">
                {t('visit.hoursTitle')}
              </h3>
            </div>
            
            <div className="w-full divide-y divide-[#eadaeb]/40 rounded-[12px] overflow-hidden border border-[#eadaeb]/60 shadow-[0_10px_30px_-15px_rgba(50,46,64,0.05)]">
              {[
                { day: t('visit.monday'), hours: "10:00 a.m. - 5:00 p.m." },
                { day: t('visit.tuesday'), hours: "10:00 a.m. - 5:00 p.m." },
                { day: t('visit.wednesday'), hours: "10:00 a.m. - 5:00 p.m." },
                { day: t('visit.thursday'), hours: "10:00 a.m. - 5:00 p.m." },
                { day: t('visit.friday'), hours: "10:00 a.m. - 5:00 p.m." },
                { day: t('visit.saturday'), hours: "12:00 p.m. - 5:00 p.m.", highlight: true },
                { day: t('visit.sunday'), hours: "12:00 p.m. - 5:00 p.m.", highlight: true },
              ].map((row, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center px-8 py-4 font-sans text-[14px] md:text-[15px] hover:bg-[#f8f4fa]/70 transition-colors
                             ${row.highlight ? "bg-[#fdfbfe] text-[#322e40]" : "bg-white text-[#676373]"}`}
                >
                  <span className={`font-semibold tracking-wide uppercase text-[12px] opacity-80 ${row.highlight ? 'text-[#cca9cd] opacity-100' : ''}`}>
                    {row.day}
                  </span>
                  <span className="font-light tracking-wide">{row.hours}</span>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
