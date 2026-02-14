"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authHeaders } from "@/lib/admin-auth";
import EventForm, { EventFormData } from "../../_components/EventForm";
import PageHeader from "../../../_components/PageHeader";
import LoadingState from "../../../_components/LoadingState";
import type { Event } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  /admin/events/[id]/edit — Edit an existing event                   */
/* ------------------------------------------------------------------ */

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [initial, setInitial] = useState<EventFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/events", {
          headers: authHeaders(),
        });

        if (!res.ok) {
          setError("Failed to load events");
          return;
        }

        const data = await res.json();
        const event: Event | undefined = (data.events ?? []).find(
          (e: Event) => e.id === id
        );

        if (!event) {
          setError("Event not found");
          return;
        }

        setInitial({
          title: event.title,
          description: event.description,
          date: event.date.slice(0, 10),
          venue: event.venue,
          bannerUrl: event.banner_url,
        });
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <LoadingState text="Loading event…" />;
  }

  if (error || !initial) {
    return (
      <div className="py-8">
        <p className="text-red-600 mb-4">{error || "Event not found"}</p>
        <button
          onClick={() => router.back()}
          className="text-sm text-indigo-600 hover:underline cursor-pointer"
        >
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Edit Event" />
      <EventForm initialData={initial} eventId={id} />
    </div>
  );
}
