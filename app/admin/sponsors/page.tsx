"use client";

import { useEffect, useState, useRef } from "react";
import { authHeaders } from "@/lib/admin-auth";
import type { Sponsor } from "@/lib/types";
import PageHeader from "../_components/PageHeader";
import LoadingState from "../_components/LoadingState";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, X, Upload, ExternalLink } from "lucide-react";

export default function AdminSponsorsPage() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Sponsor | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    // Form state
    const [name, setName] = useState("");
    const [tier, setTier] = useState("Sponsor");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [bgColor, setBgColor] = useState("#111111");
    const [sortOrder, setSortOrder] = useState(0);

    useEffect(() => { fetchSponsors(); }, []);

    async function fetchSponsors() {
        try {
            const res = await fetch("/api/admin/sponsors", { headers: authHeaders() });
            const data = await res.json();
            if (res.ok) setSponsors(data.sponsors || []);
        } catch { /* ignore */ } finally { setLoading(false); }
    }

    function resetForm() {
        setName(""); setTier("Sponsor"); setWebsiteUrl(""); setBgColor("#111111"); setSortOrder(0);
        setEditing(null); setShowForm(false); setError("");
        if (fileRef.current) fileRef.current.value = "";
    }

    function openEdit(s: Sponsor) {
        setName(s.name); setTier(s.tier); setWebsiteUrl(s.website_url || "");
        setBgColor(s.bg_color); setSortOrder(s.sort_order);
        setEditing(s); setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true); setError("");

        const fd = new FormData();
        fd.append("name", name);
        fd.append("tier", tier);
        fd.append("website_url", websiteUrl);
        fd.append("bg_color", bgColor);
        fd.append("sort_order", String(sortOrder));

        const file = fileRef.current?.files?.[0];
        if (file) fd.append("logo", file);

        if (editing && !file) {
            fd.append("is_active", String(editing.is_active));
        }

        try {
            const url = editing
                ? `/api/admin/sponsors/${editing.id}`
                : "/api/admin/sponsors";
            const res = await fetch(url, {
                method: editing ? "PUT" : "POST",
                headers: authHeaders(),
                body: fd,
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error); return; }
            resetForm();
            fetchSponsors();
        } catch {
            setError("Network error");
        } finally { setSaving(false); }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this sponsor?")) return;
        await fetch(`/api/admin/sponsors/${id}`, {
            method: "DELETE", headers: authHeaders(),
        });
        fetchSponsors();
    }

    async function toggleActive(s: Sponsor) {
        const fd = new FormData();
        fd.append("name", s.name);
        fd.append("tier", s.tier);
        fd.append("bg_color", s.bg_color);
        fd.append("sort_order", String(s.sort_order));
        fd.append("is_active", String(!s.is_active));

        await fetch(`/api/admin/sponsors/${s.id}`, {
            method: "PUT", headers: authHeaders(), body: fd,
        });
        fetchSponsors();
    }

    const inputClass = "w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors text-sm";
    const labelClass = "block text-sm font-medium text-zinc-400 mb-1.5";

    return (
        <div>
            <PageHeader title="Sponsors">
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="btn-primary !py-2 !px-5 !text-sm"
                >
                    <Plus size={16} /> Add Sponsor
                </button>
            </PageHeader>

            {/* Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                        onClick={() => resetForm()}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="glass-card p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">
                                    {editing ? "Edit Sponsor" : "Add Sponsor"}
                                </h2>
                                <button onClick={resetForm} className="text-zinc-400 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className={labelClass}>Sponsor Name *</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} placeholder="e.g. Coca-Cola" />
                                </div>

                                <div>
                                    <label className={labelClass}>Tier / Category *</label>
                                    <input value={tier} onChange={(e) => setTier(e.target.value)} required className={inputClass} placeholder="e.g. Title Sponsor, Golden Food Partner" />
                                    <p className="text-xs text-zinc-500 mt-1">Enter any custom tier name</p>
                                </div>

                                <div>
                                    <label className={labelClass}>Logo {editing ? "(leave empty to keep current)" : "*"}</label>
                                    <div className="relative">
                                        <input ref={fileRef} type="file" accept="image/*" className="hidden" id="sponsor-logo" />
                                        <label htmlFor="sponsor-logo" className={`${inputClass} cursor-pointer flex items-center gap-2 !py-3`}>
                                            <Upload size={16} className="text-zinc-400" />
                                            <span className="text-zinc-400">Choose logo file...</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Card Background</label>
                                        <div className="flex items-center gap-3">
                                            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer" />
                                            <input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className={inputClass} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Sort Order</label>
                                        <input type="number" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value))} className={inputClass} />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Website URL</label>
                                    <input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} className={inputClass} placeholder="https://sponsor.com" />
                                </div>

                                <button type="submit" disabled={saving} className="w-full btn-primary justify-center !rounded-lg">
                                    {saving ? "Saving..." : editing ? "Update Sponsor" : "Add Sponsor"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sponsor List */}
            {loading ? (
                <LoadingState text="Loading sponsors..." />
            ) : sponsors.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-zinc-500 text-lg">No sponsors yet</p>
                    <p className="text-zinc-600 text-sm mt-1">Add your first sponsor above</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {sponsors.map((s) => (
                        <motion.div
                            key={s.id}
                            layout
                            className={`glass-card p-4 relative group ${!s.is_active ? "opacity-50" : ""}`}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                                    style={{ backgroundColor: s.bg_color }}
                                >
                                    {s.logo_url && (
                                        <img src={s.logo_url} alt={s.name} className="w-full h-full object-contain p-1" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold truncate">{s.name}</h3>
                                    <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                                        {s.tier}
                                    </span>
                                    {s.website_url && (
                                        <a href={s.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-400 mt-1 transition-colors">
                                            <ExternalLink size={10} /> Website
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
                                <button onClick={() => openEdit(s)} className="flex-1 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-1">
                                    <Edit3 size={12} /> Edit
                                </button>
                                <button onClick={() => toggleActive(s)} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${s.is_active ? "text-green-400 bg-green-500/10 hover:bg-green-500/20" : "text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20"}`}>
                                    {s.is_active ? "Active" : "Hidden"}
                                </button>
                                <button onClick={() => handleDelete(s.id)} className="py-1.5 px-3 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
