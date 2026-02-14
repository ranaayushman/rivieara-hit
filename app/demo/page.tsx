"use client";

import { useState, FormEvent, ChangeEvent } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
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

/* ------------------------------------------------------------------ */
/*  Demo Page                                                          */
/* ------------------------------------------------------------------ */
export default function DemoPage() {
  // ── Register form state ───────────────────────────────────────────
  const [form, setForm] = useState({
    name: "",
    department: "",
    year: "",
    phone: "",
    utr: "",
  });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [registerRes, setRegisterRes] = useState<string>("");
  const [registerLoading, setRegisterLoading] = useState(false);

  // ── Admin payments state ──────────────────────────────────────────
  const [statusFilter, setStatusFilter] = useState("");
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [paymentsRes, setPaymentsRes] = useState<string>("");
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  /* ── Handlers ────────────────────────────────────────────────────── */

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterRes("");

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("department", form.department);
      fd.append("year", form.year);
      fd.append("phone", form.phone);
      fd.append("utr", form.utr);
      if (screenshot) fd.append("screenshot", screenshot);

      const res = await fetch("/api/register-payment", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      setRegisterRes(
        `Status: ${res.status}\n${JSON.stringify(data, null, 2)}`
      );
    } catch (err) {
      setRegisterRes(`Error: ${String(err)}`);
    } finally {
      setRegisterLoading(false);
    }
  }

  async function handleFetchPayments() {
    setPaymentsLoading(true);
    setPaymentsRes("");
    setPayments([]);

    try {
      const qs = statusFilter ? `?payment_status=${statusFilter}` : "";
      const res = await fetch(`/api/admin/payments${qs}`);
      const data = await res.json();

      if (res.ok) {
        setPayments(data);
        setPaymentsRes(`Status: ${res.status} — ${data.length} record(s)`);
      } else {
        setPaymentsRes(
          `Status: ${res.status}\n${JSON.stringify(data, null, 2)}`
        );
      }
    } catch (err) {
      setPaymentsRes(`Error: ${String(err)}`);
    } finally {
      setPaymentsLoading(false);
    }
  }

  /* ── UI ──────────────────────────────────────────────────────────── */

  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "2rem 1rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.25rem" }}>🎪 Riviera — API Demo</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>Test the register-payment and admin/payments endpoints.</p>

      {/* ── REGISTER PAYMENT FORM ──────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>POST /api/register-payment</h2>

        <form onSubmit={handleRegister} style={{ display: "grid", gap: "0.75rem" }}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleInputChange} required style={inputStyle} />
          <input name="department" placeholder="Department" value={form.department} onChange={handleInputChange} required style={inputStyle} />
          <select name="year" value={form.year} onChange={handleInputChange} required style={inputStyle}>
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleInputChange} required style={inputStyle} />
          <input name="utr" placeholder="UTR Number" value={form.utr} onChange={handleInputChange} required style={inputStyle} />
          <label style={{ fontSize: "0.85rem", color: "#555" }}>
            Screenshot (PNG / JPG, max 5 MB)
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)}
              required
              style={{ display: "block", marginTop: 4 }}
            />
          </label>

          <button type="submit" disabled={registerLoading} style={btnStyle}>
            {registerLoading ? "Submitting…" : "Submit Registration"}
          </button>
        </form>

        {registerRes && <pre style={preStyle}>{registerRes}</pre>}
      </section>

      {/* ── ADMIN: FETCH PAYMENTS ──────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>GET /api/admin/payments</h2>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={inputStyle}>
            <option value="">All statuses</option>
            <option value="auto_verified">auto_verified</option>
            <option value="pending">pending</option>
            <option value="rejected">rejected</option>
          </select>

          <button onClick={handleFetchPayments} disabled={paymentsLoading} style={btnStyle}>
            {paymentsLoading ? "Loading…" : "Fetch Payments"}
          </button>
        </div>

        {paymentsRes && <pre style={preStyle}>{paymentsRes}</pre>}

        {payments.length > 0 && (
          <div style={{ overflowX: "auto", marginTop: "1rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr>
                  {["Name", "Dept", "Year", "Phone", "UTR", "Status", "Created"].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td style={tdStyle}>{p.registrations?.name}</td>
                    <td style={tdStyle}>{p.registrations?.department}</td>
                    <td style={tdStyle}>{p.registrations?.year}</td>
                    <td style={tdStyle}>{p.registrations?.phone}</td>
                    <td style={tdStyle}>{p.utr_number}</td>
                    <td style={tdStyle}>
                      <span style={{
                        padding: "2px 8px",
                        borderRadius: 4,
                        fontSize: "0.75rem",
                        background: p.payment_status === "auto_verified" ? "#d1fae5" : p.payment_status === "rejected" ? "#fee2e2" : "#fef9c3",
                        color: p.payment_status === "auto_verified" ? "#065f46" : p.payment_status === "rejected" ? "#991b1b" : "#854d0e",
                      }}>
                        {p.payment_status}
                      </span>
                    </td>
                    <td style={tdStyle}>{new Date(p.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline styles (keeps the demo self-contained)                      */
/* ------------------------------------------------------------------ */
const sectionStyle: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: "1.25rem",
  marginBottom: "1.5rem",
  background: "#fafafa",
};

const headingStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontFamily: "monospace",
  marginBottom: "1rem",
  color: "#111",
};

const inputStyle: React.CSSProperties = {
  padding: "0.5rem 0.75rem",
  border: "1px solid #d1d5db",
  borderRadius: 6,
  fontSize: "0.9rem",
  width: "100%",
  boxSizing: "border-box",
};

const btnStyle: React.CSSProperties = {
  padding: "0.6rem 1.25rem",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: "0.9rem",
  width: "fit-content",
};

const preStyle: React.CSSProperties = {
  marginTop: "1rem",
  padding: "0.75rem",
  background: "#111",
  color: "#4ade80",
  borderRadius: 6,
  fontSize: "0.8rem",
  overflowX: "auto",
  whiteSpace: "pre-wrap",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "0.5rem",
  borderBottom: "2px solid #e5e7eb",
  background: "#f3f4f6",
};

const tdStyle: React.CSSProperties = {
  padding: "0.5rem",
  borderBottom: "1px solid #e5e7eb",
};
