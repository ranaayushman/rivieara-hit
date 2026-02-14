"use client";

import { useState } from "react";
import { EyeIcon } from "./Icons";

/* ------------------------------------------------------------------ */
/*  Payment card — displays one payment row with screenshot preview    */
/* ------------------------------------------------------------------ */

interface PaymentRecord {
  id: string;
  registration_id: string;
  utr_number: string;
  screenshot_url: string;
  payment_status: string;
  created_at: string;
  registrations?: {
    name: string;
    department: string;
    year: string;
    phone: string;
  };
}

interface PaymentCardProps {
  payment: PaymentRecord;
}

const STATUS_BADGE: Record<string, string> = {
  auto_verified: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
};

export default function PaymentCard({ payment }: PaymentCardProps) {
  const [showScreenshot, setShowScreenshot] = useState(false);

  const reg = payment.registrations;
  const badgeClass = STATUS_BADGE[payment.payment_status] ?? "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="p-4 space-y-3">
        {/* Header: name + status */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {reg?.name ?? "Unknown"}
            </p>
            <p className="text-xs text-gray-500">
              {reg?.department} · Year {reg?.year}
            </p>
          </div>
          <span
            className={`shrink-0 inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}`}
          >
            {payment.payment_status.replace("_", " ")}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
          <div>
            <span className="text-gray-400">UTR</span>
            <p className="font-medium text-gray-800 truncate">{payment.utr_number}</p>
          </div>
          <div>
            <span className="text-gray-400">Phone</span>
            <p className="font-medium text-gray-800">{reg?.phone ?? "—"}</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-400">Date</span>
            <p className="font-medium text-gray-800">
              {new Date(payment.created_at).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* View screenshot button */}
        <button
          onClick={() => setShowScreenshot(!showScreenshot)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
        >
          <EyeIcon className="w-4 h-4" />
          {showScreenshot ? "Hide Screenshot" : "View Screenshot"}
        </button>
      </div>

      {/* Screenshot preview */}
      {showScreenshot && payment.screenshot_url && (
        <div className="border-t border-gray-200 bg-gray-50 p-3">
          <a
            href={payment.screenshot_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src={payment.screenshot_url}
              alt={`Payment screenshot – ${payment.utr_number}`}
              className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
            />
          </a>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Click image to open full size
          </p>
        </div>
      )}
    </div>
  );
}
