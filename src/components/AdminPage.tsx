"use client";

import { useState, useEffect } from "react";
import type { Order } from "@/components/Contact";

const STATUS_CONFIG = {
  Pending:    { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", dot: "#facc15" },
  "In Transit": { color: "text-blue-400",   bg: "bg-blue-400/10",   border: "border-blue-400/30",   dot: "#60a5fa" },
  Delivered:  { color: "text-green-400",  bg: "bg-green-400/10",  border: "border-green-400/30",  dot: "#4ade80" },
};

const STATUS_FLOW: Order["status"][] = ["Pending", "In Transit", "Delivered"];

function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("haritwal_orders") || "[]");
}

function saveOrders(orders: Order[]) {
  localStorage.setItem("haritwal_orders", JSON.stringify(orders));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────
function DeleteConfirmModal({
  order,
  onConfirm,
  onCancel,
}: {
  order: Order;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative w-full max-w-sm bg-[#0f1e35] border border-[#1a2b4a] rounded-2xl p-7 shadow-2xl">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center mx-auto mb-5">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path
              d="M4 6.5h18M10 6.5V5a3 3 0 016 0v1.5M9 6.5l1 14h6l1-14"
              stroke="#f87171"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="text-white text-lg font-extrabold text-center mb-1">Delete Order?</h3>
        <p className="text-[#7a9bbf] text-sm text-center mb-1">
          This will permanently remove the booking for
        </p>
        <p className="text-white font-semibold text-center mb-1">{order.fullName}</p>
        <p className="text-[#3d5070] text-xs text-center mb-6 font-mono">{order.id}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#0b1528] border border-[#1a2b4a] text-[#7a9bbf] hover:border-[#4b9cf5]/40 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="bg-[#0f1e35] border border-[#1a2b4a] rounded-2xl px-6 py-5 flex flex-col gap-1">
      <span className={`text-3xl font-extrabold ${color}`}>{count}</span>
      <span className="text-xs text-[#7a9bbf] font-semibold uppercase tracking-wider">{label}</span>
    </div>
  );
}

// ─── Order Card ───────────────────────────────────────────────────────────────
function OrderCard({
  order,
  onStatusChange,
  onDeleteRequest,
}: {
  order: Order;
  onStatusChange: (id: string, status: Order["status"]) => void;
  onDeleteRequest: (order: Order) => void;
}) {
  const cfg = STATUS_CONFIG[order.status];
  const nextStatus = STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1];

  return (
    <div className="bg-[#0f1e35] border border-[#1a2b4a] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#4b9cf5]/30 transition-colors">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-white font-bold text-base leading-tight">{order.fullName}</p>
          <p className="text-[#7a9bbf] text-sm mt-0.5">{order.phone}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
            {order.status}
          </span>
          <button
            onClick={() => onDeleteRequest(order)}
            className="text-[#3d5070] hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-400/10"
            title="Delete order"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M6 4V2h4v2M5 4l.5 9h5L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Service + Date */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs bg-[#4b9cf5]/10 text-[#4b9cf5] border border-[#4b9cf5]/20 px-3 py-1 rounded-full font-medium">
          {order.service}
        </span>
        <span className="text-xs text-[#3d5070]">{formatDate(order.createdAt)}</span>
        <span className="text-xs text-[#3d5070] font-mono">{order.id}</span>
      </div>

      {/* Route */}
      <div className="bg-[#0b1528] border border-[#1a2b4a] rounded-xl p-4 space-y-2">
        <div className="flex items-start gap-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
            <circle cx="8" cy="8" r="5" fill="#22c55e" />
            <circle cx="8" cy="8" r="2.5" fill="#fff" />
          </svg>
          <p className="text-sm text-[#c8d8ed] leading-snug">{order.pickup}</p>
        </div>
        <div className="ml-[7px] w-px h-3 bg-[#1a2b4a]" />
        <div className="flex items-start gap-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
            <path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3 4 9 4 9s4-6 4-9c0-2.21-1.79-4-4-4z" fill="#ef4444" />
            <circle cx="8" cy="5.5" r="1.5" fill="#fff" />
          </svg>
          <p className="text-sm text-[#c8d8ed] leading-snug">{order.drop}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap">
        {nextStatus && (
          <button
            onClick={() => onStatusChange(order.id, nextStatus)}
            className="flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-sm font-semibold bg-[#4b9cf5] hover:bg-[#3a8de6] text-white transition-colors flex items-center justify-center gap-2"
          >
            {nextStatus === "In Transit" ? <><TruckIcon /> Mark In Transit</> : <><CheckIcon /> Mark Delivered</>}
          </button>
        )}
        {order.status === "Delivered" && (
          <div className="flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-sm font-semibold bg-green-400/10 text-green-400 border border-green-400/20 flex items-center justify-center gap-2">
            <CheckIcon /> Delivered ✓
          </div>
        )}
      </div>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 3h9v7H1V3zM10 5h3l2 2v3h-5V5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="3.5" cy="11.5" r="1.5" fill="currentColor" />
      <circle cx="11.5" cy="11.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<Order["status"] | "All">("All");
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setOrders(getOrders()), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (id: string, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(updated);
    saveOrders(updated);
  };

  const handleDeleteConfirmed = () => {
    if (!pendingDelete) return;
    const updated = orders.filter((o) => o.id !== pendingDelete.id);
    setOrders(updated);
    saveOrders(updated);
    setPendingDelete(null);
  };

  const filtered = orders.filter((o) => {
    const matchesFilter = filter === "All" || o.status === filter;
    const matchesSearch =
      o.fullName.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    inTransit: orders.filter((o) => o.status === "In Transit").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
  };

  return (
    <>
      {/* Delete confirmation modal */}
      {pendingDelete && (
        <DeleteConfirmModal
          order={pendingDelete}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      <div className="min-h-screen bg-[#0b1528] px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
              <p className="text-[#7a9bbf] text-sm mt-1">Manage all incoming orders</p>
            </div>
            <span className="text-xs text-[#3d5070] border border-[#1a2b4a] px-3 py-1.5 rounded-full">
              Auto-refreshes every 5s
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Orders" count={counts.total} color="text-white" />
            <StatCard label="Pending" count={counts.pending} color="text-yellow-400" />
            <StatCard label="In Transit" count={counts.inTransit} color="text-blue-400" />
            <StatCard label="Delivered" count={counts.delivered} color="text-green-400" />
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3d5070]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, phone or order ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#0f1e35] border border-[#1a2b4a] text-white placeholder-[#3d5070] rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#4b9cf5] transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["All", "Pending", "In Transit", "Delivered"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
                    filter === s
                      ? "bg-[#4b9cf5] text-white border-[#4b9cf5]"
                      : "bg-[#0f1e35] text-[#7a9bbf] border-[#1a2b4a] hover:border-[#4b9cf5]/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#3d5070]">
              <svg className="mx-auto mb-4 opacity-40" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="12" width="32" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
                <path d="M16 12V10a8 8 0 0116 0v2" stroke="currentColor" strokeWidth="2" />
                <path d="M18 24h12M18 30h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="font-semibold">No orders found</p>
              <p className="text-sm mt-1">
                {orders.length === 0 ? "Bookings will appear here once submitted." : "Try adjusting your filter or search."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onDeleteRequest={(o) => setPendingDelete(o)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}