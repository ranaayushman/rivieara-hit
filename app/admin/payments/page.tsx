"use client";

import { useEffect, useState } from "react";
import { authHeaders } from "@/lib/admin-auth";
import PageHeader from "../_components/PageHeader";
import LoadingState from "../_components/LoadingState";
import EmptyState from "../_components/EmptyState";
import PaymentCard from "../_components/PaymentCard";
import { CreditCardIcon } from "../_components/Icons";

/* ------------------------------------------------------------------ */
/*  /admin/payments — Payment listing with screenshot preview          */
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

const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "auto_verified", label: "Verified" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function fetchPayments() {
    setLoading(true);
    try {
      const url = statusFilter
        ? `/api/admin/payments?payment_status=${statusFilter}`
        : "/api/admin/payments";

      const res = await fetch(url, { headers: authHeaders() });
      if (!res.ok) return;
      const data = await res.json();
      setPayments(data ?? []);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader title="Payments" />

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatusFilter(opt.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer ${
              statusFilter === opt.value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {opt.label}
          </button>
        ))}

        {/* Count badge */}
        {!loading && (
          <span className="ml-auto text-xs text-gray-500">
            {payments.length} record{payments.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && <LoadingState text="Loading payments…" />}

      {/* Empty */}
      {!loading && payments.length === 0 && (
        <EmptyState
          icon={<CreditCardIcon className="w-12 h-12" />}
          message="No payments found."
        />
      )}

      {/* Payment cards */}
      {!loading && payments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {payments.map((p) => (
            <PaymentCard key={p.id} payment={p} />
          ))}
        </div>
      )}
    </div>
  );
}
