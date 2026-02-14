"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authHeaders } from "@/lib/admin-auth";
import type { Event } from "@/lib/types";
import PageHeader from "../_components/PageHeader";
import LoadingState from "../_components/LoadingState";
import EmptyState from "../_components/EmptyState";
import EventCard from "../_components/EventCard";
import { PlusIcon, CalendarIcon } from "../_components/Icons";

/* ------------------------------------------------------------------ */
/*  /admin/events — Event listing page                                 */
/* ------------------------------------------------------------------ */

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/events", {
        headers: authHeaders(),
      });
      if (!res.ok) return;
      const data = await res.json();
      setEvents(data.events ?? []);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this event?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/events?id=${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      alert("Failed to delete event.");
    } finally {
      setDeleting(null);
    }
  }

  function handleEdit(id: string) {
    router.push(`/admin/events/${id}/edit`);
  }

  return (
    <div>
      <PageHeader
        title="Events"
        action={{
          label: "Add Event",
          href: "/admin/events/new",
          icon: <PlusIcon className="w-4 h-4" />,
        }}
      />

      {/* Loading state */}
      {loading && <LoadingState text="Loading events…" />}

      {/* Empty state */}
      {!loading && events.length === 0 && (
        <EmptyState
          icon={<CalendarIcon className="w-12 h-12" />}
          message="No events yet."
          action={{ label: "Create your first event →", href: "/admin/events/new" }}
        />
      )}

      {/* Event cards grid */}
      {!loading && events.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deleting === event.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
