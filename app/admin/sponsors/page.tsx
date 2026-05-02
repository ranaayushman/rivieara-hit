"use client";

import { useState } from "react";
import Image from "next/image";
import PageHeader from "../_components/PageHeader";
import EmptyState from "../_components/EmptyState";
import { PlusIcon } from "../_components/Icons";
import { Pencil, Trash2 } from "lucide-react";

interface Sponsor {
  id: string;
  name: string;
  logoUrl?: string;
  description: string;
  location?: string;
  galleryImages: string[];
}

// Initial mock data to show the layout
const INITIAL_SPONSORS: Sponsor[] = [
  {
    id: "1",
    name: "Sprite",
    description: "Official Beverage Partner for Riviera 2026.",
    location: "Kolkata Hub",
    logoUrl: "", // Admin would upload this
    galleryImages: ["/gallery1.jpg", "/gallery2.jpg"]
  },
  {
    id: "2",
    name: "Coca-Cola",
    description: "Title sponsor and main stage contributor.",
    location: "Global",
    logoUrl: "",
    galleryImages: ["/gallery3.jpg"]
  }
];

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(INITIAL_SPONSORS);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this sponsor?")) return;
    setDeleting(id);
    setTimeout(() => {
      setSponsors((prev) => prev.filter((s) => s.id !== id));
      setDeleting(null);
    }, 600); // Simulate network request
  };

  return (
    <div>
      <PageHeader
        title="Manage Sponsors"
        action={{
          label: "Add Sponsor",
          href: "/admin/sponsors/new", // To be created
          icon: <PlusIcon className="w-4 h-4" />,
        }}
      />

      {sponsors.length === 0 ? (
        <EmptyState
          icon={<div className="w-12 h-12 bg-gray-200 rounded-full mb-4 mx-auto" />}
          message="No sponsors added yet."
          action={{ label: "Add your first sponsor →", href: "/admin/sponsors/new" }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sponsors.map((sponsor) => (
            <div 
              key={sponsor.id} 
              className="bg-[#0f0404]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 relative overflow-hidden group hover:border-[#ff3333]/30 transition-colors duration-300"
            >
              {deleting === sponsor.id && (
                <div className="absolute inset-0 bg-[#0a0202]/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <p className="text-[#ff3333] font-medium animate-pulse">Deleting...</p>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {/* Logo Placeholder */}
                  <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative">
                    {sponsor.logoUrl ? (
                      <Image src={sponsor.logoUrl} alt={sponsor.name} fill className="object-cover" />
                    ) : (
                      <span className="text-white/30 text-xs font-medium text-center px-1">No Logo</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#ff3333] transition-colors">{sponsor.name}</h3>
                    {sponsor.location && (
                      <p className="text-sm text-white/50 flex items-center gap-1 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {sponsor.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(sponsor.id)}
                    className="p-2 text-white/40 hover:text-[#ff3333] transition-colors rounded-lg hover:bg-[#ff3333]/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-white/60 text-sm">{sponsor.description}</p>

              {/* Gallery Preview */}
              {sponsor.galleryImages.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-white/30 mb-2 uppercase tracking-widest">Promotional Images</p>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {sponsor.galleryImages.map((img, i) => (
                      <div key={i} className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                        {/* Placeholder fallback for now */}
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/20 font-medium">IMG {i+1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
