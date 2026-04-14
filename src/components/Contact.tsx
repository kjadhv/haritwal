"use client";

import { useState, useEffect, useRef, useCallback, type FormEvent } from "react";

type ServiceType =
  | "Home Shifting"
  | "Office Shifting"
  | "Car Carrier"
  | "Fleet Logistics"
  | "Smart Warehousing";

const serviceOptions: ServiceType[] = [
  "Home Shifting",
  "Office Shifting",
  "Car Carrier",
  "Fleet Logistics",
  "Smart Warehousing",
];

export type Order = {
  id: string;
  fullName: string;
  phone: string;
  service: ServiceType;
  pickup: string;
  drop: string;
  status: "Pending" | "In Transit" | "Delivered";
  createdAt: string;
};

// ─── Save order to localStorage ──────────────────────────────────────────────
function saveOrder(order: Order) {
  const existing: Order[] = JSON.parse(localStorage.getItem("haritwal_orders") || "[]");
  existing.unshift(order);
  localStorage.setItem("haritwal_orders", JSON.stringify(existing));
}

// ─── Nominatim autocomplete ───────────────────────────────────────────────────
async function fetchSuggestions(query: string): Promise<string[]> {
  if (query.length < 3) return [];
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`,
    { headers: { "Accept-Language": "en" } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((item: { display_name: string }) => item.display_name);
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─── Location Input ───────────────────────────────────────────────────────────
function LocationInput({
  label,
  placeholder,
  icon,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [fetching, setFetching] = useState(false);
  const debouncedValue = useDebounce(value, 400);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!debouncedValue || debouncedValue.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    setFetching(true);
    fetchSuggestions(debouncedValue).then((results) => {
      setSuggestions(results);
      setOpen(results.length > 0);
      setFetching(false);
    });
  }, [debouncedValue]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = useCallback(
    (s: string) => { onChange(s); setOpen(false); setSuggestions([]); },
    [onChange]
  );

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-xs font-semibold text-[#4b9cf5] mb-2 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          {icon}
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          className="input-field pl-11 w-full"
          autoComplete="off"
          required
        />
        {fetching && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="#1a2b4a" strokeWidth="2" />
              <path d="M8 2a6 6 0 016 6" stroke="#4b9cf5" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        )}
      </div>
      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-[#0f1e35] border border-[#1a2b4a] rounded-xl overflow-hidden shadow-xl">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => handleSelect(s)}
              className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-[#152340] transition-colors border-b border-[#1a2b4a] last:border-b-0"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                <path d="M7 1C4.79 1 3 2.79 3 5c0 2.625 4 8 4 8s4-5.375 4-8c0-2.21-1.79-4-4-4z" fill="#4b9cf5" />
                <circle cx="7" cy="5" r="1.5" fill="#0f1e35" />
              </svg>
              <span className="text-sm text-[#c8d8ed] leading-snug line-clamp-2">{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    service: "Office Shifting" as ServiceType,
    pickup: "",
    drop: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.pickup || !form.drop) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    // Save to localStorage — admin page reads from here
    const order: Order = {
      id: `ORD-${Date.now()}`,
      fullName: form.fullName,
      phone: form.phone,
      service: form.service,
      pickup: form.pickup,
      drop: form.drop,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    saveOrder(order);

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-center">
        <div className="w-full max-w-2xl bg-[#0f1e35] border border-[#1a2b4a] rounded-3xl p-10 md:p-14">
          {submitted ? (
            <SuccessState
              name={form.fullName}
              service={form.service}
              pickup={form.pickup}
              drop={form.drop}
            />
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-white mb-3">Let&apos;s Get Moving</h2>
                <p className="text-[#7a9bbf] text-sm">Fill out the form for an instant digital estimate.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="input-field" required />
                  <input type="tel" placeholder="Phone Number" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input-field" required />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4b9cf5] mb-2 uppercase tracking-wider">Service Type</label>
                  <select value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value as ServiceType })}
                    className="input-field appearance-none">
                    {serviceOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 h-px bg-[#1a2b4a]" />
                  <span className="text-xs font-semibold text-[#4b9cf5] uppercase tracking-widest">Route</span>
                  <div className="flex-1 h-px bg-[#1a2b4a]" />
                </div>

                <div className="relative flex flex-col gap-4">
                  <div className="absolute left-[18px] top-[52px] bottom-[52px] w-px bg-[#1a2b4a] z-0" />
                  <LocationInput label="Pickup Location" placeholder="Enter pickup address…"
                    value={form.pickup} onChange={(val) => setForm({ ...form, pickup: val })}
                    icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6" fill="#22c55e" /><circle cx="9" cy="9" r="3" fill="#fff" /></svg>} />
                  <LocationInput label="Drop Location" placeholder="Enter drop address…"
                    value={form.drop} onChange={(val) => setForm({ ...form, drop: val })}
                    icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1.5C6.51 1.5 4.5 3.51 4.5 6c0 3.375 4.5 10.5 4.5 10.5S13.5 9.375 13.5 6c0-2.49-2.01-4.5-4.5-4.5z" fill="#ef4444" /><circle cx="9" cy="6" r="1.75" fill="#fff" /></svg>} />
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary w-full py-4 text-base mt-2 flex items-center justify-center gap-2">
                  {loading ? <><Spinner />Processing...</> : "Confirm Booking"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function SuccessState({ name, service, pickup, drop }: { name: string; service: string; pickup: string; drop: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-[#4b9cf5]/15 flex items-center justify-center mx-auto mb-6">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#4b9cf5]">
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
          <path d="M10 16.5l4.5 4.5 7.5-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-3xl font-extrabold text-white mb-3">Booking Confirmed!</h3>
      <p className="text-[#7a9bbf] text-sm mb-1">Thanks, <span className="text-white font-semibold">{name}</span>!</p>
      <p className="text-[#7a9bbf] text-sm mb-4">
        Our team will contact you shortly regarding your <span className="text-[#4b9cf5] font-semibold">{service}</span> request.
      </p>
      <div className="mt-4 bg-[#0b1528] border border-[#1a2b4a] rounded-2xl p-5 text-left space-y-3">
        <div className="flex items-start gap-3">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 shrink-0"><circle cx="9" cy="9" r="6" fill="#22c55e" /><circle cx="9" cy="9" r="3" fill="#fff" /></svg>
          <div><p className="text-[#4b9cf5] text-xs font-semibold uppercase tracking-wider mb-0.5">Pickup</p><p className="text-white text-sm">{pickup}</p></div>
        </div>
        <div className="ml-[9px] w-px h-4 bg-[#1a2b4a]" />
        <div className="flex items-start gap-3">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 shrink-0"><path d="M9 1.5C6.51 1.5 4.5 3.51 4.5 6c0 3.375 4.5 10.5 4.5 10.5S13.5 9.375 13.5 6c0-2.49-2.01-4.5-4.5-4.5z" fill="#ef4444" /><circle cx="9" cy="6" r="1.75" fill="#fff" /></svg>
          <div><p className="text-[#4b9cf5] text-xs font-semibold uppercase tracking-wider mb-0.5">Drop</p><p className="text-white text-sm">{drop}</p></div>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M9 2a7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}