"use client";

import { CalendarIcon, LocationIcon } from "./Icons";
import type { Event } from "@/lib/types";


interface EventCardProps {
  event: Event;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function EventCard({
  event,
  onEdit,
  onDelete,
  isDeleting,
}: EventCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
      {/* Banner */}
      {event.banner_url ? (
        <img
          src={event.banner_url}
          alt={event.title}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
          No banner
        </div>
      )}

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-base font-semibold text-gray-900 line-clamp-1">
          {event.title}
        </h2>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {event.description}
        </p>

        {/* Meta */}
        <div className="mt-3 space-y-1 text-xs text-gray-500">
          <p className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            {new Date(event.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="flex items-center gap-1.5">
            <LocationIcon className="w-3.5 h-3.5" />
            {event.venue}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4 flex gap-2">
          <button
            onClick={() => onEdit(event.id)}
            className="flex-1 text-center text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event.id)}
            disabled={isDeleting}
            className="flex-1 text-center text-sm font-medium px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
