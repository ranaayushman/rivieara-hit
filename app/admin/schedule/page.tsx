"use client";

import { useEffect, useState } from "react";
import { authHeaders } from "@/lib/admin-auth";
import type { ScheduleItem } from "@/lib/types";
import PageHeader from "../_components/PageHeader";
import LoadingState from "../_components/LoadingState";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, X, Clock, Calendar } from "lucide-react";

export default function AdminSchedulePage() {
    const [items, setItems] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<ScheduleItem | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [dayLabel, setDayLabel] = useState("Day 1");
    const [time, setTime] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [sortOrder, setSortOrder] = useState(0);

    useEffect(() => { fetchItems(); }, []);

    async function fetchItems() {
        try {
            const res = await fetch("/api/admin/schedule", { headers: authHeaders() });
            const data = await res.json();
            if (res.ok) setItems(data.items || []);
        } catch { /* */ } finally { setLoading(false); }
    }

    function resetForm() {
        setDayLabel("Day 1"); setTime(""); setTitle(""); setDescription(""); setSortOrder(0);
        setEditing(null); setShowForm(false); setError("");
    }

    function openEdit(item: ScheduleItem) {
        setDayLabel(item.day_label); setTime(item.time); setTitle(item.title);
        setDescription(item.description || ""); setSortOrder(item.sort_order);
        setEditing(item); setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); setSaving(true); setError("");
        try {
            const url = editing ? `/api/admin/schedule/${editing.id}` : "/api/admin/schedule";
            const res = await fetch(url, {
                method: editing ? "PUT" : "POST",
                headers: { ...authHeaders(), "Content-Type": "application/json" },
                body: JSON.stringify({ day_label: dayLabel, time, title, description, sort_order: sortOrder }),
            });
            if (!res.ok) { const d = await res.json(); setError(d.error); return; }
            resetForm(); fetchItems();
        } catch { setError("Network error"); } finally { setSaving(false); }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this schedule item?")) return;
        await fetch(`/api/admin/schedule/${id}`, { method: "DELETE", headers: authHeaders() });
        fetchItems();
    }

    const grouped: Record<string, ScheduleItem[]> = {};
    for (const item of items) {
        if (!grouped[item.day_label]) grouped[item.day_label] = [];
        grouped[item.day_label].push(item);
    }
    const days = Object.keys(grouped).sort();
    const ic = "w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors text-sm";
    const lc = "block text-sm font-medium text-zinc-400 mb-1.5";

    return (
        <div>
            <PageHeader title="Schedule">
                <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary !py-2 !px-5 !text-sm"><Plus size={16} /> Add Item</button>
            </PageHeader>

            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => resetForm()}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card p-6 sm:p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">{editing ? "Edit Item" : "Add Schedule Item"}</h2>
                                <button onClick={resetForm} className="text-zinc-400 hover:text-white"><X size={20} /></button>
                            </div>
                            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">{error}</div>}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className={lc}>Day *</label><input value={dayLabel} onChange={(e) => setDayLabel(e.target.value)} required className={ic} placeholder="Day 1" /></div>
                                    <div><label className={lc}>Time *</label><input value={time} onChange={(e) => setTime(e.target.value)} required className={ic} placeholder="09:00 AM" /></div>
                                </div>
                                <div><label className={lc}>Title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} required className={ic} placeholder="Opening Ceremony" /></div>
                                <div><label className={lc}>Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${ic} resize-none`} rows={2} /></div>
                                <div><label className={lc}>Sort Order</label><input type="number" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value))} className={ic} /></div>
                                <button type="submit" disabled={saving} className="w-full btn-primary justify-center !rounded-lg">{saving ? "Saving..." : editing ? "Update" : "Add Item"}</button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading ? <LoadingState text="Loading schedule..." /> : items.length === 0 ? (
                <div className="text-center py-20"><Calendar size={48} className="mx-auto text-zinc-600 mb-4" /><p className="text-zinc-500 text-lg">No schedule items yet</p></div>
            ) : (
                <div className="space-y-8 mt-6">
                    {days.map((day) => (
                        <div key={day}>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Calendar size={18} className="text-red-500" /> {day}</h3>
                            <div className="space-y-3">
                                {grouped[day].map((item) => (
                                    <motion.div key={item.id} layout className="glass-card p-4 flex items-start gap-4">
                                        <div className="flex-shrink-0 flex items-center gap-1.5 text-red-400 text-sm font-medium min-w-[90px]"><Clock size={14} /> {item.time}</div>
                                        <div className="flex-1 min-w-0"><h4 className="text-white font-semibold">{item.title}</h4>{item.description && <p className="text-zinc-500 text-sm mt-0.5">{item.description}</p>}</div>
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <button onClick={() => openEdit(item)} className="p-1.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Edit3 size={14} /></button>
                                            <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 size={14} /></button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
