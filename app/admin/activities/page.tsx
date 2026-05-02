"use client";

import { useEffect, useState } from "react";
import { authHeaders } from "@/lib/admin-auth";
import type { Activity } from "@/lib/types";
import PageHeader from "../_components/PageHeader";
import LoadingState from "../_components/LoadingState";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, X, Eye, EyeOff, Zap } from "lucide-react";

const ICON_OPTIONS = ["Code", "Music", "Gamepad2", "Cpu", "Palette", "Trophy", "Camera", "BookOpen", "Mic2", "Rocket", "Globe", "Lightbulb"];

export default function AdminActivitiesPage() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Activity | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [iconName, setIconName] = useState("Code");
    const [sortOrder, setSortOrder] = useState(0);

    useEffect(() => { fetchActivities(); }, []);

    async function fetchActivities() {
        try {
            const res = await fetch("/api/admin/activities", { headers: authHeaders() });
            const data = await res.json();
            if (res.ok) setActivities(data.activities || []);
        } catch { /* */ } finally { setLoading(false); }
    }

    function resetForm() {
        setTitle(""); setDescription(""); setIconName("Code"); setSortOrder(0);
        setEditing(null); setShowForm(false); setError("");
    }

    function openEdit(a: Activity) {
        setTitle(a.title); setDescription(a.description); setIconName(a.icon_name); setSortOrder(a.sort_order);
        setEditing(a); setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); setSaving(true); setError("");
        try {
            const url = editing ? `/api/admin/activities/${editing.id}` : "/api/admin/activities";
            const res = await fetch(url, {
                method: editing ? "PUT" : "POST",
                headers: { ...authHeaders(), "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, icon_name: iconName, sort_order: sortOrder }),
            });
            if (!res.ok) { const d = await res.json(); setError(d.error); return; }
            resetForm(); fetchActivities();
        } catch { setError("Network error"); } finally { setSaving(false); }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this activity?")) return;
        await fetch(`/api/admin/activities/${id}`, { method: "DELETE", headers: authHeaders() });
        fetchActivities();
    }

    async function toggleActive(a: Activity) {
        await fetch(`/api/admin/activities/${a.id}`, {
            method: "PUT",
            headers: { ...authHeaders(), "Content-Type": "application/json" },
            body: JSON.stringify({ ...a, is_active: !a.is_active }),
        });
        fetchActivities();
    }

    const ic = "w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors text-sm";
    const lc = "block text-sm font-medium text-zinc-400 mb-1.5";

    return (
        <div>
            <PageHeader title="Activities">
                <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary !py-2 !px-5 !text-sm"><Plus size={16} /> Add Activity</button>
            </PageHeader>

            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => resetForm()}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card p-6 sm:p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">{editing ? "Edit Activity" : "Add Activity"}</h2>
                                <button onClick={resetForm} className="text-zinc-400 hover:text-white"><X size={20} /></button>
                            </div>
                            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">{error}</div>}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div><label className={lc}>Title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} required className={ic} placeholder="Hackathon" /></div>
                                <div><label className={lc}>Description *</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} required className={`${ic} resize-none`} rows={3} placeholder="Brief description..." /></div>
                                <div>
                                    <label className={lc}>Icon</label>
                                    <div className="flex flex-wrap gap-2">
                                        {ICON_OPTIONS.map((icon) => (
                                            <button key={icon} type="button" onClick={() => setIconName(icon)}
                                                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${iconName === icon ? "border-red-500 bg-red-500/20 text-red-400" : "border-white/10 text-zinc-400 hover:border-white/20"}`}>
                                                {icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div><label className={lc}>Sort Order</label><input type="number" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value))} className={ic} /></div>
                                <button type="submit" disabled={saving} className="w-full btn-primary justify-center !rounded-lg">{saving ? "Saving..." : editing ? "Update" : "Add Activity"}</button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading ? <LoadingState text="Loading activities..." /> : activities.length === 0 ? (
                <div className="text-center py-20"><Zap size={48} className="mx-auto text-zinc-600 mb-4" /><p className="text-zinc-500 text-lg">No activities yet</p></div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {activities.map((a) => (
                        <motion.div key={a.id} layout className={`glass-card p-5 ${!a.is_active ? "opacity-50" : ""}`}>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-red-400 text-sm font-bold">{a.icon_name.slice(0, 2)}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold">{a.title}</h3>
                                    <p className="text-zinc-500 text-sm mt-1 line-clamp-2">{a.description}</p>
                                    <span className="text-xs text-zinc-600 mt-1 inline-block">Icon: {a.icon_name}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
                                <button onClick={() => openEdit(a)} className="flex-1 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-1"><Edit3 size={12} /> Edit</button>
                                <button onClick={() => toggleActive(a)} className="py-1.5 px-3 text-xs font-medium rounded-lg transition-colors text-zinc-400 bg-white/5 hover:bg-white/10">
                                    {a.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                                </button>
                                <button onClick={() => handleDelete(a.id)} className="py-1.5 px-3 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 size={12} /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
