"use client";

import { useEffect, useState, useRef } from "react";
import { authHeaders } from "@/lib/admin-auth";
import type { GalleryImage } from "@/lib/types";

// Extended type to match Supabase join response
interface AlbumWithImages {
    id: string;
    title: string;
    description: string | null;
    cover_url: string | null;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    gallery_images: GalleryImage[];
}
import PageHeader from "../_components/PageHeader";
import LoadingState from "../_components/LoadingState";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, X, Upload, Image as ImageIcon, FolderOpen, Eye, EyeOff } from "lucide-react";

export default function AdminGalleryPage() {
    const [albums, setAlbums] = useState<AlbumWithImages[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAlbumForm, setShowAlbumForm] = useState(false);
    const [editingAlbum, setEditingAlbum] = useState<AlbumWithImages | null>(null);
    const [viewingAlbum, setViewingAlbum] = useState<AlbumWithImages | null>(null);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const imageInputRef = useRef<HTMLInputElement>(null);

    // Album form
    const [albumTitle, setAlbumTitle] = useState("");
    const [albumDesc, setAlbumDesc] = useState("");
    const [albumSortOrder, setAlbumSortOrder] = useState(0);

    useEffect(() => { fetchAlbums(); }, []);

    async function fetchAlbums() {
        try {
            const res = await fetch("/api/admin/gallery", { headers: authHeaders() });
            const data = await res.json();
            if (res.ok) setAlbums(data.albums || []);
        } catch { /* ignore */ } finally { setLoading(false); }
    }

    function resetAlbumForm() {
        setAlbumTitle(""); setAlbumDesc(""); setAlbumSortOrder(0);
        setEditingAlbum(null); setShowAlbumForm(false); setError("");
    }

    function openEditAlbum(a: AlbumWithImages) {
        setAlbumTitle(a.title); setAlbumDesc(a.description || ""); setAlbumSortOrder(a.sort_order);
        setEditingAlbum(a); setShowAlbumForm(true);
    }

    async function handleAlbumSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true); setError("");

        try {
            const url = editingAlbum ? `/api/admin/gallery/${editingAlbum.id}` : "/api/admin/gallery";
            const res = await fetch(url, {
                method: editingAlbum ? "PUT" : "POST",
                headers: { ...authHeaders(), "Content-Type": "application/json" },
                body: JSON.stringify({ title: albumTitle, description: albumDesc, sort_order: albumSortOrder }),
            });
            if (!res.ok) { const d = await res.json(); setError(d.error); return; }
            resetAlbumForm(); fetchAlbums();
        } catch { setError("Network error"); }
        finally { setSaving(false); }
    }

    async function deleteAlbum(id: string) {
        if (!confirm("Delete this album and all its images?")) return;
        await fetch(`/api/admin/gallery/${id}`, { method: "DELETE", headers: authHeaders() });
        if (viewingAlbum?.id === id) setViewingAlbum(null);
        fetchAlbums();
    }

    async function toggleAlbumActive(a: AlbumWithImages) {
        await fetch(`/api/admin/gallery/${a.id}`, {
            method: "PUT",
            headers: { ...authHeaders(), "Content-Type": "application/json" },
            body: JSON.stringify({ title: a.title, description: a.description, sort_order: a.sort_order, is_active: !a.is_active }),
        });
        fetchAlbums();
    }

    async function handleImageUpload(albumId: string) {
        const files = imageInputRef.current?.files;
        if (!files?.length) return;

        setUploading(true);
        const fd = new FormData();
        for (const f of files) fd.append("images", f);

        try {
            await fetch(`/api/admin/gallery/${albumId}`, {
                method: "POST", headers: authHeaders(), body: fd,
            });
            fetchAlbums();
        } catch { /* ignore */ }
        finally {
            setUploading(false);
            if (imageInputRef.current) imageInputRef.current.value = "";
        }
    }

    async function deleteImage(imageId: string) {
        if (!confirm("Delete this image?")) return;
        await fetch(`/api/admin/gallery/images/${imageId}`, { method: "DELETE", headers: authHeaders() });
        fetchAlbums();
    }

    const inputClass = "w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors text-sm";
    const labelClass = "block text-sm font-medium text-zinc-400 mb-1.5";

    // Find the currently viewing album from live data
    const currentAlbum = viewingAlbum ? albums.find(a => a.id === viewingAlbum.id) : null;

    return (
        <div>
            <PageHeader title="Gallery">
                <button onClick={() => { resetAlbumForm(); setShowAlbumForm(true); }} className="btn-primary !py-2 !px-5 !text-sm">
                    <Plus size={16} /> New Album
                </button>
            </PageHeader>

            {/* Album Form Modal */}
            <AnimatePresence>
                {showAlbumForm && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                        onClick={() => resetAlbumForm()}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="glass-card p-6 sm:p-8 w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">{editingAlbum ? "Edit Album" : "New Album"}</h2>
                                <button onClick={resetAlbumForm} className="text-zinc-400 hover:text-white"><X size={20} /></button>
                            </div>

                            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">{error}</div>}

                            <form onSubmit={handleAlbumSubmit} className="space-y-4">
                                <div>
                                    <label className={labelClass}>Album Title *</label>
                                    <input value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} required className={inputClass} placeholder="e.g. Cultural Night 2025" />
                                </div>
                                <div>
                                    <label className={labelClass}>Description</label>
                                    <textarea value={albumDesc} onChange={(e) => setAlbumDesc(e.target.value)} className={`${inputClass} resize-none`} rows={3} placeholder="Brief description..." />
                                </div>
                                <div>
                                    <label className={labelClass}>Sort Order</label>
                                    <input type="number" value={albumSortOrder} onChange={(e) => setAlbumSortOrder(parseInt(e.target.value))} className={inputClass} />
                                </div>
                                <button type="submit" disabled={saving} className="w-full btn-primary justify-center !rounded-lg">
                                    {saving ? "Saving..." : editingAlbum ? "Update Album" : "Create Album"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Album Detail View */}
            <AnimatePresence>
                {currentAlbum && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0a]/95 backdrop-blur-xl overflow-y-auto"
                    >
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-gradient-to-b from-[#0a0a0a] to-transparent">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{currentAlbum.title}</h2>
                                <p className="text-zinc-500 text-sm">{(currentAlbum.gallery_images || []).length} photos</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" id="gallery-upload"
                                    onChange={() => handleImageUpload(currentAlbum.id)} />
                                <label htmlFor="gallery-upload" className={`btn-primary !py-2 !px-5 !text-sm cursor-pointer ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                                    <Upload size={16} /> {uploading ? "Uploading..." : "Upload Images"}
                                </label>
                                <button onClick={() => setViewingAlbum(null)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 pt-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {(currentAlbum.gallery_images || []).map((img) => (
                                <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-white/5">
                                    <img src={img.image_url} alt={img.caption || ""} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button onClick={() => deleteImage(img.id)} className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Albums Grid */}
            {loading ? (
                <LoadingState text="Loading albums..." />
            ) : albums.length === 0 ? (
                <div className="text-center py-20">
                    <FolderOpen size={48} className="mx-auto text-zinc-600 mb-4" />
                    <p className="text-zinc-500 text-lg">No albums yet</p>
                    <p className="text-zinc-600 text-sm mt-1">Create your first album to start uploading photos</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {albums.map((album) => {
                        const images = album.gallery_images || [];
                        return (
                            <motion.div key={album.id} layout className={`glass-card overflow-hidden ${!album.is_active ? "opacity-50" : ""}`}>
                                {/* Cover */}
                                <div
                                    className="h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden cursor-pointer"
                                    onClick={() => setViewingAlbum(album)}
                                >
                                    {album.cover_url ? (
                                        <img src={album.cover_url} alt={album.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon size={32} className="text-zinc-600" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-2 right-2 px-2 py-0.5 text-xs bg-black/60 backdrop-blur-sm rounded-full text-zinc-300">
                                        {images.length} photos
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="text-white font-semibold">{album.title}</h3>
                                    {album.description && <p className="text-zinc-500 text-sm mt-1 line-clamp-2">{album.description}</p>}

                                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
                                        <button onClick={() => setViewingAlbum(album)} className="flex-1 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-1">
                                            <FolderOpen size={12} /> Open
                                        </button>
                                        <button onClick={() => openEditAlbum(album)} className="flex-1 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-1">
                                            <Edit3 size={12} /> Edit
                                        </button>
                                        <button onClick={() => toggleAlbumActive(album)} className="py-1.5 px-2 text-xs font-medium rounded-lg transition-colors text-zinc-400 bg-white/5 hover:bg-white/10">
                                            {album.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                                        </button>
                                        <button onClick={() => deleteAlbum(album.id)} className="py-1.5 px-2 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
