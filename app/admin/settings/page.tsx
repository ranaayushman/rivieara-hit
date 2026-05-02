"use client";

import { useEffect, useState } from "react";
import { authHeaders } from "@/lib/admin-auth";
import PageHeader from "../_components/PageHeader";
import LoadingState from "../_components/LoadingState";
import { Save, Settings2 } from "lucide-react";

interface SettingsData {
    hero: { title: string; year: string; subtitle: string };
    fest_info: { dates: string; venue: string; registration_open: boolean };
    contact: { email: string; phone: string; address: string };
}

const defaults: SettingsData = {
    hero: { title: "Riviera", year: "2026", subtitle: "Biggest Private College Fest in West Bengal" },
    fest_info: { dates: "March 25–28, 2026", venue: "HIT Campus, Haldia", registration_open: true },
    contact: { email: "info@riviera2026.com", phone: "+91 9142047263", address: "HIT Campus, Haldia, West Bengal 721657" },
};

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<SettingsData>(defaults);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => { fetchSettings(); }, []);

    async function fetchSettings() {
        try {
            const res = await fetch("/api/admin/settings", { headers: authHeaders() });
            const data = await res.json();
            if (res.ok && data.settings) {
                setSettings({
                    hero: { ...defaults.hero, ...(data.settings.hero || {}) },
                    fest_info: { ...defaults.fest_info, ...(data.settings.fest_info || {}) },
                    contact: { ...defaults.contact, ...(data.settings.contact || {}) },
                });
            }
        } catch { /* */ } finally { setLoading(false); }
    }

    async function handleSave() {
        setSaving(true); setSaved(false);
        try {
            await fetch("/api/admin/settings", {
                method: "PUT",
                headers: { ...authHeaders(), "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch { /* */ } finally { setSaving(false); }
    }

    const ic = "w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors text-sm";
    const lc = "block text-sm font-medium text-zinc-400 mb-1.5";

    if (loading) return <LoadingState text="Loading settings..." />;

    return (
        <div>
            <PageHeader title="Site Settings">
                <button onClick={handleSave} disabled={saving} className="btn-primary !py-2 !px-5 !text-sm">
                    <Save size={16} /> {saving ? "Saving..." : saved ? "Saved ✓" : "Save All"}
                </button>
            </PageHeader>

            <div className="space-y-8 mt-6 max-w-2xl">
                {/* Hero */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Settings2 size={18} className="text-red-500" /> Hero Section</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className={lc}>Title</label><input value={settings.hero.title} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value } })} className={ic} /></div>
                            <div><label className={lc}>Year</label><input value={settings.hero.year} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, year: e.target.value } })} className={ic} /></div>
                        </div>
                        <div><label className={lc}>Subtitle</label><input value={settings.hero.subtitle} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: e.target.value } })} className={ic} /></div>
                    </div>
                </div>

                {/* Fest Info */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Settings2 size={18} className="text-red-500" /> Fest Information</h3>
                    <div className="space-y-4">
                        <div><label className={lc}>Dates</label><input value={settings.fest_info.dates} onChange={(e) => setSettings({ ...settings, fest_info: { ...settings.fest_info, dates: e.target.value } })} className={ic} /></div>
                        <div><label className={lc}>Venue</label><input value={settings.fest_info.venue} onChange={(e) => setSettings({ ...settings, fest_info: { ...settings.fest_info, venue: e.target.value } })} className={ic} /></div>
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-zinc-400">Registration Open</label>
                            <button type="button" onClick={() => setSettings({ ...settings, fest_info: { ...settings.fest_info, registration_open: !settings.fest_info.registration_open } })}
                                className={`w-12 h-6 rounded-full transition-colors relative ${settings.fest_info.registration_open ? "bg-green-500" : "bg-zinc-700"}`}>
                                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${settings.fest_info.registration_open ? "left-[26px]" : "left-0.5"}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Settings2 size={18} className="text-red-500" /> Contact Info</h3>
                    <div className="space-y-4">
                        <div><label className={lc}>Email</label><input value={settings.contact.email} onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })} className={ic} /></div>
                        <div><label className={lc}>Phone</label><input value={settings.contact.phone} onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })} className={ic} /></div>
                        <div><label className={lc}>Address</label><textarea value={settings.contact.address} onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value } })} className={`${ic} resize-none`} rows={2} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
