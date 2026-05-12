"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { X, Maximize2, ChevronRight, Scan, Zap } from "lucide-react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

/* ── Tactical Corner SVG ── */
function TacticalCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotate = { tl: 0, tr: 90, bl: -90, br: 180 }[position];
  const pos = {
    tl: { top: -1, left: -1 },
    tr: { top: -1, right: -1 },
    bl: { bottom: -1, left: -1 },
    br: { bottom: -1, right: -1 },
  }[position];
  return (
    <svg
      width="10" height="10" viewBox="0 0 14 14"
      className="absolute pointer-events-none z-30"
      style={{ ...pos, transform: `rotate(${rotate}deg)` }}
    >
      <path d="M0 0 L14 0 L14 2.5 L2.5 2.5 L2.5 14 L0 14 Z" fill="#FF204E" opacity="0.35" />
    </svg>
  );
}

interface AlbumData {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const fallbackGallery: AlbumData[] = [
  { id: "cultural-event", title: "Crimson Stage 2025", description: "Electrifying performances and relentless energy from the main combat stage.", images: ["/gallery2.jpg", "/gallery3.jpg", "/gallery4.jpg","/cul4.jpg","/cul5.jpg","/cul6.jpg","/cul7.jpg","/cul8.jpg","/cul9.jpg","/cul10.jpg","/cul11.jpg","/cul12.jpg","/cul13.jpg","/cul14.jpg"] },
  { id: "hackathon", title: "Non-Combat Operations", description: "Tactical creativity, strategic gaming, and high-stakes challenges beyond the digital battlefield.", images: ["/Gamings.jpeg", "/gaming4.jpeg", "/gaming6.jpeg", "/Gaming3.jpeg"] },
  { id: "edm-night", title: "Final Domain", description: "The crowd ignited as the bass dropped in the final arena showdown.", images: ["/cul.jpg", "/cul1.jpg", "/cul2.jpg","/cul3.jpg", "/cul15.jpg","/cul16.jpg","/cul17.jpg","/cul18.jpg","/cul19.jpg","/cul20.jpg","/cul21.jpg","/cul22.jpg","/cul23.jpg","/cul24.jpg","/cul25.jpg"] },
];

/* ── Section embers ── */
function PageEmbers({ isLowPower }: { isLowPower: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => {
    const count = isLowPower ? 4 : 8;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${(i * 23 + 7) % 100}%`,
      y: `${(i * 19 + 12) % 90}%`,
      size: ((i * 3) % 2) + 1.5,
      opacity: ((i * 6) % 10 + 5) / 100,
      dur: 6 + ((i * 3) % 5),
      delay: (i * 0.5) % 3,
    }));
  }, [isLowPower]);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[3]" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: "radial-gradient(circle, #FF204E, rgba(169,16,50,0.15))",
            boxShadow: `0 0 ${p.size * 2}px rgba(255,32,78,0.2)`,
          }}
          animate={!isLowPower ? { y: [-3, 3, -3], opacity: [p.opacity, p.opacity * 2, p.opacity] } : {}}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Animation variants ── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Fullscreen Lightbox with Escape + Click-outside ── */
function FullscreenLightbox({ image, onClose }: { image: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(5,5,7,0.96)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      {/* Close button — large and visible */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-5 right-5 sm:top-6 sm:right-6 w-11 h-11 rounded-sm flex items-center justify-center z-20 transition-all duration-200"
        style={{
          background: "rgba(255,32,78,0.1)",
          border: "1px solid rgba(255,32,78,0.3)",
          color: "rgba(245,245,245,0.7)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,32,78,0.2)";
          e.currentTarget.style.borderColor = "rgba(255,32,78,0.5)";
          e.currentTarget.style.color = "#F5F5F5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,32,78,0.1)";
          e.currentTarget.style.borderColor = "rgba(255,32,78,0.3)";
          e.currentTarget.style.color = "rgba(245,245,245,0.7)";
        }}
        aria-label="Close image"
      >
        <X size={20} />
      </button>

      {/* Image container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl h-full max-h-[85vh] rounded-sm overflow-hidden"
        style={{
          border: "1px solid rgba(255,32,78,0.12)",
          boxShadow: "0 0 50px rgba(255,32,78,0.05)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={image} alt="Fullscreen view" fill className="object-contain" sizes="100vw" priority />
      </motion.div>

      {/* "Tap anywhere to close" hint */}
      <motion.p
        className="mt-4 text-[9px] tracking-[0.3em] uppercase font-bold"
        style={{ color: "rgba(245,245,245,0.15)", fontFamily: "var(--font-tactical)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        TAP ANYWHERE TO CLOSE • ESC
      </motion.p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   DETAILED GALLERY — SURVEILLANCE ARCHIVE
═══════════════════════════════════════════════ */
export default function DetailedGallery() {
  const [galleryData, setGalleryData] = useState<AlbumData[]>(fallbackGallery);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const { isLowPower, isMounted } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion && !isLowPower;

  useEffect(() => {
    fetch("/api/public/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (data.albums && data.albums.length > 0) {
          const albums: AlbumData[] = data.albums.map((a: Record<string, unknown>) => ({
            id: a.id as string,
            title: a.title as string,
            description: (a.description as string) || "",
            images: ((a as { gallery_images?: { image_url: string }[] }).gallery_images || []).map((img) => img.image_url),
          }));
          const hasImages = albums.some((a) => a.images.length > 0);
          if (hasImages) setGalleryData(albums);
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  const expandedEvent = galleryData.find((e) => e.id === expandedEventId);

  return (
    <>
      <section
        id="detailed-gallery"
        className="relative min-h-screen overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #050507 0%, #08080D 25%, #12070B 50%, #09090F 75%, #050507 100%)",
        }}
      >
        {/* ── BACKGROUND LAYERS ── */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.012]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,32,78,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,32,78,0.2) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 bg-noise opacity-[0.03] z-0" />
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-[0.01]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 65% 60% at 50% 30%, transparent 30%, rgba(5,5,7,0.5) 100%)" }}
        />
        {isMounted && <PageEmbers isLowPower={isLowPower} />}

        {/* ── CONTENT ── */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

          {/* ── HEADING ── */}
          <motion.div
            className="text-center mb-16 md:mb-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-5">
              <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
              <p
                className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold"
                style={{ fontFamily: "var(--font-tactical)", color: "#FF204E", opacity: 0.7 }}
              >
                ◆ RECOVERED FILES ◆
              </p>
              <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em] relative z-10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span style={{ color: "#F5F5F5", textShadow: "0 0 35px rgba(255,32,78,0.1)" }}>
                SURVEILLANCE{" "}
              </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #FF204E, #FF2E63, #FF4D6D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "var(--font-tactical)",
                  filter: "drop-shadow(0 0 18px rgba(255,32,78,0.2))",
                }}
              >
                ARCHIVE
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-sm md:text-base max-w-lg mx-auto"
              style={{ color: "rgba(245,245,245,0.4)", fontFamily: "var(--font-body)" }}
            >
              Recovered footage from previous operations.
            </motion.p>
          </motion.div>

          {/* ── ALBUM SECTIONS ── */}
          <div className="space-y-20 md:space-y-28">
            {galleryData.map((event, index) => (
              <motion.div
                key={event.id}
                initial={!shouldReduceMotion ? { opacity: 0, y: 30 } : {}}
                whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Album header */}
                <div
                  className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4"
                  style={{ borderBottom: "1px solid rgba(255,32,78,0.06)" }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Scan size={12} className="text-[#FF204E] opacity-40" />
                      <span
                        className="text-[8px] tracking-[0.3em] uppercase font-bold"
                        style={{ color: "rgba(255,32,78,0.4)", fontFamily: "var(--font-tactical)" }}
                      >
                        SECTOR—{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-black tracking-tight mb-1"
                      style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm" style={{ color: "rgba(245,245,245,0.3)" }}>
                      {event.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setExpandedEventId(event.id)}
                    className="flex items-center gap-2 text-xs font-bold group whitespace-nowrap tracking-[0.15em] uppercase transition-colors duration-200"
                    style={{ color: "rgba(255,32,78,0.5)", fontFamily: "var(--font-tactical)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#FF204E"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,32,78,0.5)"; }}
                  >
                    Access {event.images.length} Files
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Image grid — first 4 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {event.images.slice(0, 4).map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={shouldAnimate ? { scale: 1.02, y: -3 } : {}}
                      transition={{ duration: 0.25 }}
                      className={`relative rounded-sm overflow-hidden cursor-pointer group ${
                        i === 0
                          ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2 h-[200px] sm:h-[280px] md:h-[380px]"
                          : "h-[95px] sm:h-[130px] md:h-[180px]"
                      }`}
                      style={{
                        border: "1px solid rgba(255,32,78,0.08)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
                        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                      }}
                      onClick={() => setFullscreenImage(img)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,32,78,0.2)";
                        e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.5), 0 0 15px rgba(255,32,78,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,32,78,0.08)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4)";
                      }}
                    >
                      {/* Tactical corners on hero image */}
                      {i === 0 && (
                        <>
                          <TacticalCorner position="tl" />
                          <TacticalCorner position="tr" />
                          <TacticalCorner position="bl" />
                          <TacticalCorner position="br" />
                        </>
                      )}

                      <Image
                        src={img}
                        alt={`${event.title} — File ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                      />

                      {/* Dark overlay */}
                      <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                          background: "linear-gradient(to top, rgba(5,5,7,0.55) 0%, transparent 50%)",
                        }}
                      />

                      {/* Scanline */}
                      <div
                        className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
                        style={{
                          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0.05) 2px)",
                        }}
                      />

                      {/* Hover expand icon */}
                      <div className="absolute inset-0 z-20 bg-[rgba(5,5,7,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Maximize2 className="text-[rgba(245,245,245,0.6)]" size={i === 0 ? 28 : 20} />
                      </div>

                      {/* File stamp on hero */}
                      {i === 0 && (
                        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[rgba(9,9,15,0.7)] border border-[rgba(255,32,78,0.12)]">
                          <Scan size={10} className="text-[#FF204E] opacity-50" />
                          <span
                            className="text-[7px] tracking-[0.25em] uppercase font-bold"
                            style={{ color: "rgba(245,245,245,0.4)", fontFamily: "var(--font-tactical)" }}
                          >
                            FILE {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPANDED GALLERY MODAL ═══ */}
      <AnimatePresence>
        {expandedEventId && expandedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
            style={{ background: "rgba(5,5,7,0.97)", backdropFilter: "blur(16px)" }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 sm:p-8"
              style={{ background: "linear-gradient(to bottom, rgba(5,5,7,0.95), transparent)" }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={10} className="text-[#FF204E] opacity-50" />
                  <span
                    className="text-[8px] tracking-[0.3em] uppercase font-bold"
                    style={{ color: "rgba(255,32,78,0.4)", fontFamily: "var(--font-tactical)" }}
                  >
                    FULL ACCESS
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-black mb-1"
                  style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                >
                  {expandedEvent.title}
                </h2>
                <p
                  className="text-xs font-bold tracking-[0.15em]"
                  style={{ color: "rgba(255,32,78,0.4)", fontFamily: "var(--font-tactical)" }}
                >
                  {expandedEvent.images.length} FILES RECOVERED
                </p>
              </div>
              <button
                onClick={() => setExpandedEventId(null)}
                className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(255,32,78,0.06)",
                  border: "1px solid rgba(255,32,78,0.2)",
                  color: "rgba(245,245,245,0.5)",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Masonry grid */}
            <div className="p-6 sm:p-8 pt-0 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {expandedEvent.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-sm overflow-hidden cursor-pointer group break-inside-avoid"
                  style={{ border: "1px solid rgba(255,32,78,0.06)" }}
                  onClick={() => setFullscreenImage(img)}
                >
                  <div className={`relative w-full ${i % 3 === 0 ? "aspect-[4/5]" : i % 2 === 0 ? "aspect-square" : "aspect-[3/2]"}`}>
                    <Image
                      src={img}
                      alt={`${expandedEvent.title} — File ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.02]"
                      style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0.05) 2px)" }}
                    />
                    <div className="absolute inset-0 z-20 bg-[rgba(5,5,7,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Maximize2 className="text-[rgba(245,245,245,0.5)]" size={24} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ FULLSCREEN LIGHTBOX ═══ */}
      <AnimatePresence>
        {fullscreenImage && (
          <FullscreenLightbox
            image={fullscreenImage}
            onClose={() => setFullscreenImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
