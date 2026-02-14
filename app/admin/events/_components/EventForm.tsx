"use client";

import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { authHeaders } from "@/lib/admin-auth";
import ErrorBanner from "../../_components/ErrorBanner";
import FieldWrapper from "../../_components/FieldWrapper";
import { ImageIcon } from "../../_components/Icons";

/* ------------------------------------------------------------------ */
/*  Shared event form used by both "New" and "Edit" pages              */
/* ------------------------------------------------------------------ */

export interface EventFormData {
  title: string;
  description: string;
  date: string;       // ISO date string (YYYY-MM-DD)
  venue: string;
  bannerUrl?: string | null;
}

interface Props {
  /** Pre-filled values when editing */
  initialData?: EventFormData;
  /** Event id — present only when editing */
  eventId?: string;
}

export default function EventForm({ initialData, eventId }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!eventId;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [date, setDate] = useState(initialData?.date ?? "");
  const [venue, setVenue] = useState(initialData?.venue ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.bannerUrl ?? null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleImageChange(file: File | null) {
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const fd = new FormData();
      if (isEditing) fd.append("id", eventId);
      fd.append("title", title);
      fd.append("description", description);
      fd.append("date", date);
      fd.append("venue", venue);
      if (image) fd.append("image", image);

      const res = await fetch("/api/admin/events", {
        method: isEditing ? "PUT" : "POST",
        headers: authHeaders(),
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      router.push("/admin/events");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 space-y-5 max-w-2xl"
    >
      {/* Error */}
      <ErrorBanner message={error} />

      {/* Title */}
      <FieldWrapper label="Title" htmlFor="title">
        <input
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-style"
          placeholder="Workshop on AI"
        />
      </FieldWrapper>

      {/* Description */}
      <FieldWrapper label="Description" htmlFor="description">
        <textarea
          id="description"
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-style resize-y"
          placeholder="A brief intro about the event…"
        />
      </FieldWrapper>

      {/* Date & Venue — side by side on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWrapper label="Date" htmlFor="date">
          <input
            id="date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-style"
          />
        </FieldWrapper>

        <FieldWrapper label="Venue" htmlFor="venue">
          <input
            id="venue"
            required
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="input-style"
            placeholder="Main Auditorium"
          />
        </FieldWrapper>
      </div>

      {/* Image upload */}
      <FieldWrapper label="Banner Image" htmlFor="image">
        <div className="space-y-3">
          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Banner preview"
              className="w-full max-h-48 object-cover rounded-lg border border-gray-200"
            />
          )}

          {/* Custom file input */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 transition-colors"
          >
            <ImageIcon className="mx-auto w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              {image ? image.name : "Click to upload (JPG, PNG, WebP · max 5 MB)"}
            </p>
          </div>

          <input
            ref={fileInputRef}
            id="image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
          />
        </div>
      </FieldWrapper>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-indigo-600 text-white rounded-lg px-4 py-2.5 text-sm font-semibold
                     hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {loading
            ? isEditing
              ? "Saving…"
              : "Creating…"
            : isEditing
              ? "Save Changes"
              : "Create Event"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 sm:flex-none border border-gray-300 text-gray-700 rounded-lg px-4 py-2.5 text-sm font-medium
                     hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
