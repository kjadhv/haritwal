"use client";

import { useState, type FormEvent } from "react";

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

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    service: "Office Shifting" as ServiceType,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0b1528]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-center">
        <div className="w-full max-w-2xl bg-[#0f1e35] border border-[#1a2b4a] rounded-3xl p-10 md:p-14">
          {submitted ? (
            <SuccessState name={form.fullName} service={form.service} />
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-white mb-3">
                  Let&apos;s Get Moving
                </h2>
                <p className="text-[#7a9bbf] text-sm">
                  Fill out the form for an instant digital estimate.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    className="input-field"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="input-field"
                    required
                  />
                </div>

                {/* Service type */}
                <div>
                  <label className="block text-xs font-semibold text-[#4b9cf5] mb-2 uppercase tracking-wider">
                    Service Type
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        service: e.target.value as ServiceType,
                      })
                    }
                    className="input-field appearance-none"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 text-base mt-2 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function SuccessState({
  name,
  service,
}: {
  name: string;
  service: string;
}) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-[#4b9cf5]/15 flex items-center justify-center mx-auto mb-6">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="text-[#4b9cf5]"
        >
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
          <path
            d="M10 16.5l4.5 4.5 7.5-9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-3xl font-extrabold text-white mb-3">
        Booking Confirmed!
      </h3>
      <p className="text-[#7a9bbf] text-sm mb-1">
        Thanks, <span className="text-white font-semibold">{name}</span>!
      </p>
      <p className="text-[#7a9bbf] text-sm">
        Our team will contact you shortly regarding your{" "}
        <span className="text-[#4b9cf5] font-semibold">{service}</span>{" "}
        request.
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <circle
        cx="9"
        cy="9"
        r="7"
        stroke="white"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      <path
        d="M9 2a7 7 0 017 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
