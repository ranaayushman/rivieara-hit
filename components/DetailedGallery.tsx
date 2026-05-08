"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

interface AlbumData {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const fallbackGallery: AlbumData[] = [
  { id: "cultural-night", title: "Cultural Night 2025", description: "Electrifying performances and unforgettable vibes from the main stage.", images: ["/gallery2.jpg", "/gallery3.jpg", "/gallery4.jpg"] },
  { id: "hackathon", title: "Non-Tech Events", description: "Experience music, dance, fashion, gaming, creativity, and unforgettable moments beyond technology.", images: ["/Gamings.jpeg", "/gaming4.jpeg", "/gaming6.jpeg", "/Gaming3.jpeg"] },
  { id: "edm-night", title: "EDM Night", description: "The crowd went wild with our guest DJs dropping the bass.", images: ["/gallery3.jpg", "/gallery4.jpg", "/gallery2.jpg"] },
];

export default function DetailedGallery() {
  const [galleryData, setGalleryData] = useState<AlbumData[]>(fallbackGallery);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

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
          // Only use dynamic if albums have images, otherwise keep fallback
          const hasImages = albums.some((a) => a.images.length > 0);
          if (hasImages) setGalleryData(albums);
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  const expandedEvent = galleryData.find((e) => e.id === expandedEventId);

  return (
    <>
      <SectionWrapper id="detailed-gallery" className="min-h-screen">
        <SectionHeading text="Event" accent="Memories" subtitle="Explore the highlights from our previous editions" />

        <div className="max-w-7xl mx-auto space-y-24 mt-12">
          {galleryData.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-3xl font-bold text-white tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>{event.title}</h3>
                  <p className="text-[var(--gold-dim)] text-sm sm:text-base font-light">{event.description}</p>
                </div>
                <button onClick={() => setExpandedEventId(event.id)} className="flex items-center gap-2 text-sm font-medium text-[var(--gold-primary)] hover:text-[var(--gold-light)] transition-colors group whitespace-nowrap tracking-wider">
                  View All {event.images.length} Photos
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {event.images.slice(0, 4).map((img, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.03, y: -5 }}
                    className={`relative rounded-xl overflow-hidden cursor-pointer group shadow-[0_0_20px_var(--gold-glow)] ring-1 ring-[var(--border-gold)] bg-[var(--surface-glass)] ${i === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2 h-[200px] sm:h-[300px] md:h-[424px]" : "h-[100px] sm:h-[140px] md:h-[200px]"}`}
                    onClick={() => setFullscreenImage(img)}
                  >
                    <Image src={img} alt={`${event.title} preview ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"} />
                    <div className="absolute inset-0 bg-[var(--surface-glass)] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Maximize2 className="text-[var(--gold-light)] drop-shadow-lg" size={24} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Expanded Event Gallery Modal */}
      <AnimatePresence>
        {expandedEventId && expandedEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-[var(--bg-primary)]/95 backdrop-blur-xl overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 sm:p-8 bg-gradient-to-b from-[var(--bg-primary)] to-transparent">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>{expandedEvent.title}</h2>
                <p className="text-[var(--gold-primary)] font-medium tracking-wide">{expandedEvent.images.length} Photos</p>
              </div>
              <button onClick={() => setExpandedEventId(null)} className="w-12 h-12 rounded-full bg-[var(--surface-glass)] border border-[var(--border-gold)] hover:bg-[var(--gold-glow)] flex items-center justify-center text-[var(--gold-light)] transition-colors"><X size={24} /></button>
            </div>
            <div className="p-6 sm:p-8 pt-0 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {expandedEvent.images.map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="relative rounded-xl overflow-hidden cursor-pointer group break-inside-avoid shadow-[0_0_20px_var(--gold-glow)] ring-1 ring-[var(--border-gold)]"
                  onClick={() => setFullscreenImage(img)}>
                  <div className={`relative w-full ${i % 3 === 0 ? 'aspect-[4/5]' : i % 2 === 0 ? 'aspect-square' : 'aspect-[3/2]'}`}>
                    <Image src={img} alt={`${expandedEvent.title} full ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-[var(--surface-glass)] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"><Maximize2 className="text-[var(--gold-light)] drop-shadow-lg" size={28} /></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--bg-deep)]/95 backdrop-blur-md p-4 sm:p-8" onClick={() => setFullscreenImage(null)}>
            <button onClick={(e) => { e.stopPropagation(); setFullscreenImage(null); }} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[var(--surface-glass)] border border-[var(--border-gold)] hover:bg-[var(--gold-glow)] flex items-center justify-center text-[var(--gold-light)] transition-colors z-10"><X size={24} /></button>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full max-w-6xl h-full max-h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_50px_var(--gold-glow)]" onClick={(e) => e.stopPropagation()}>
              <Image src={fullscreenImage} alt="Fullscreen view" fill className="object-contain" sizes="100vw" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
