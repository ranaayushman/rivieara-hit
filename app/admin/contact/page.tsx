"use client";

import { useEffect, useState } from "react";
import { authHeaders } from "@/lib/admin-auth";
import type { ContactInquiry } from "@/lib/types";
import PageHeader from "../_components/PageHeader";
import LoadingState from "../_components/LoadingState";
import { motion } from "framer-motion";
import { Trash2, Mail, MailOpen, MessageSquare, Clock } from "lucide-react";

export default function AdminContactPage() {
    const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchInquiries(); }, []);

    async function fetchInquiries() {
        try {
            const res = await fetch("/api/admin/contact", { headers: authHeaders() });
            const data = await res.json();
            if (res.ok) setInquiries(data.inquiries || []);
        } catch { /* */ } finally { setLoading(false); }
    }

    async function toggleRead(inq: ContactInquiry) {
        await fetch(`/api/admin/contact/${inq.id}`, {
            method: "PATCH",
            headers: { ...authHeaders(), "Content-Type": "application/json" },
            body: JSON.stringify({ is_read: !inq.is_read }),
        });
        fetchInquiries();
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this inquiry?")) return;
        await fetch(`/api/admin/contact/${id}`, { method: "DELETE", headers: authHeaders() });
        fetchInquiries();
    }

    const unreadCount = inquiries.filter(i => !i.is_read).length;

    return (
        <div>
            <PageHeader title={`Contact Inquiries ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`} />

            {loading ? <LoadingState text="Loading inquiries..." /> : inquiries.length === 0 ? (
                <div className="text-center py-20">
                    <MessageSquare size={48} className="mx-auto text-zinc-600 mb-4" />
                    <p className="text-zinc-500 text-lg">No inquiries yet</p>
                </div>
            ) : (
                <div className="space-y-3 mt-6">
                    {inquiries.map((inq) => (
                        <motion.div key={inq.id} layout className={`glass-card p-5 ${!inq.is_read ? "border-red-500/20" : ""}`}>
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${inq.is_read ? "bg-white/5" : "bg-red-500/10"}`}>
                                    {inq.is_read ? <MailOpen size={18} className="text-zinc-500" /> : <Mail size={18} className="text-red-400" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-white font-semibold">{inq.name}</h3>
                                        {!inq.is_read && <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-red-500 text-white font-bold">NEW</span>}
                                    </div>
                                    <p className="text-zinc-500 text-xs mt-0.5">{inq.email}{inq.phone ? ` • ${inq.phone}` : ""}</p>
                                    <p className="text-zinc-300 text-sm mt-2 whitespace-pre-wrap">{inq.message}</p>
                                    <p className="text-zinc-600 text-xs mt-2 flex items-center gap-1"><Clock size={10} /> {new Date(inq.created_at).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <button onClick={() => toggleRead(inq)} className="p-1.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors" title={inq.is_read ? "Mark unread" : "Mark read"}>
                                        {inq.is_read ? <Mail size={14} /> : <MailOpen size={14} />}
                                    </button>
                                    <button onClick={() => handleDelete(inq.id)} className="p-1.5 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
