"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Maximize2 } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: "campus" | "library" | "arts";
  image: string;
  aspect: string;
}

const items: GalleryItem[] = [
  { id: 1, title: "Siddiqiyyah Courtyard Vista", category: "campus", image: "/campus/WhatsApp Image 2026-06-01 at 16.35.31.jpeg", aspect: "aspect-[4/3]" },
  { id: 2, title: "Sacred Calligraphy Study", category: "arts", image: "/campus/WhatsApp Image 2026-06-01 at 16.35.31 (1).jpeg", aspect: "aspect-[3/4]" },
  { id: 3, title: "Central Library Corridor", category: "library", image: "/campus/WhatsApp Image 2026-06-01 at 16.38.59.jpeg", aspect: "aspect-[1/1]" },
  { id: 4, title: "Sanctuary Prayer Hall Arches", category: "campus", image: "/campus/WhatsApp Image 2026-06-01 at 16.39.15.jpeg", aspect: "aspect-[3/4]" },
  { id: 5, title: "Scholastic Lecture Wing", category: "campus", image: "/campus/WhatsApp Image 2026-06-01 at 16.44.41 (1).jpeg", aspect: "aspect-[4/3]" },
  { id: 6, title: "Siddiqiyyah Entrance Gate", category: "campus", image: "/campus/IMG_2000.JPG", aspect: "aspect-[4/3]" },
  { id: 7, title: "Traditional Study Halqa", category: "campus", image: "/campus/IMG_2032.JPG", aspect: "aspect-[3/4]" },
  { id: 8, title: "Ancient Manuscripts Archive", category: "library", image: "/campus/IMG_2033.JPG", aspect: "aspect-[1/1]" },
  { id: 9, title: "Symmetric Arch Architecture", category: "arts", image: "/campus/IMG_2054.JPG", aspect: "aspect-[3/4]" },
  { id: 10, title: "Peaceful Courtyard Oasis", category: "campus", image: "/campus/IMG_2055.JPG", aspect: "aspect-[4/3]" },
  { id: 11, title: "Sacred Quranic Inscriptions", category: "arts", image: "/campus/IMG_2057.JPG", aspect: "aspect-[4/3]" },
  { id: 12, title: "Grand Library Dome", category: "library", image: "/campus/IMG_2071.JPG", aspect: "aspect-[3/4]" },
  { id: 13, title: "Intricate Mihrab Details", category: "arts", image: "/campus/IMG_2073.JPG", aspect: "aspect-[1/1]" },
  { id: 14, title: "Evening Sanctuary Vista", category: "campus", image: "/campus/IMG_2080.JPG", aspect: "aspect-[4/3]" },
  { id: 15, title: "Classical Literature Hall", category: "library", image: "/campus/IMG_2094.JPG", aspect: "aspect-[3/4]" },
  { id: 16, title: "Floral Islamic Motifs", category: "arts", image: "/campus/IMG_2097.JPG", aspect: "aspect-[1/1]" },
  { id: 17, title: "Seekers of Sacred Sciences", category: "campus", image: "/campus/IMG_2107.JPG", aspect: "aspect-[3/4]" },
  { id: 18, title: "Central Library Study Wing", category: "library", image: "/campus/IMG_2108.JPG", aspect: "aspect-[4/3]" },
  { id: 19, title: "Arabic Calligraphy Gallery", category: "arts", image: "/campus/IMG_2109.JPG", aspect: "aspect-[4/3]" },
  { id: 20, title: "Sunlit Courtyard Arcades", category: "campus", image: "/campus/IMG_2110.JPG", aspect: "aspect-[3/4]" },
  { id: 21, title: "Hadith Reference Library", category: "library", image: "/campus/IMG_2111.JPG", aspect: "aspect-[1/1]" },
  { id: 22, title: "Geometry of the Minaret", category: "arts", image: "/campus/IMG_2112.JPG", aspect: "aspect-[3/4]" },
  { id: 23, title: "Dawn Prayer Gathering", category: "campus", image: "/campus/IMG_2113.JPG", aspect: "aspect-[4/3]" },
  { id: 24, title: "Islamic Fiqh Research Desk", category: "library", image: "/campus/IMG_2132.JPG", aspect: "aspect-[3/4]" },
  { id: 25, title: "Sacred Adab & Etiquette Class", category: "campus", image: "/campus/IMG_2133.JPG", aspect: "aspect-[1/1]" }
];

export default function CampusGallery() {
  const [filter, setFilter] = useState<"all" | "campus" | "library" | "arts">("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = filter === "all" ? items : items.filter(item => item.category === filter);

  return (
    <div className="space-y-8">
      {/* Category Selectors */}
      <div className="flex justify-center gap-2">
        {(["all", "campus", "library", "arts"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
              filter === cat
                ? "bg-primary border-primary text-white shadow-md"
                : "bg-white/50 border-primary/5 hover:bg-white text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Columns */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`break-inside-avoid relative group rounded-xl overflow-hidden shadow-md bg-white border border-primary/5 cursor-pointer ${item.aspect}`}
              onClick={() => setSelectedImage(item.image)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-end p-6">
                <div className="w-full flex justify-between items-center text-white">
                  <div>
                    <span className="block text-[8px] font-bold tracking-widest text-secondary-fixed uppercase mb-1">
                      {item.category}
                    </span>
                    <span className="font-display font-semibold italic text-sm">
                      {item.title}
                    </span>
                  </div>
                  <Maximize2 className="w-4 h-4 text-white/80" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-primary/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Expanded preview"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
