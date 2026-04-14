import type { ReactNode } from "react";

interface Service {
  icon: ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <BriefcaseIcon />,
    title: "Enterprise Relocation",
    description:
      "Full office setup with minimal downtime and data-safe handling.",
  },
  {
    icon: <TruckIcon />,
    title: "Fleet Logistics",
    description:
      "Specialized transport for vehicles and high-value cargo.",
  },
  {
    icon: <WarehouseIcon />,
    title: "Smart Warehousing",
    description:
      "Climate-controlled storage with 24/7 digital tracking.",
  },
];

const stats = [
  { value: "15k+", label: "Moves Completed" },
  { value: "99.8%", label: "On-Time Rate" },
  { value: "4.9★", label: "Customer Rating" },
  { value: "2012", label: "Established" },
];

export default function Services() {
  return (
    <>
      {/* Services Section */}
      <section id="services" className="py-24 bg-[#0b1528]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Heading */}
          <div className="mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-white">Tailored </span>
              <span className="text-[#4b9cf5]">Services</span>
            </h2>
            <p className="mt-4 text-[#7a9bbf] text-base max-w-md">
              End-to-end logistics solutions engineered for homes, offices, and
              enterprises across India.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((s) => (
              <div key={s.title} className="service-card">
                <div className="mb-6 text-[#4b9cf5]">{s.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-[#7a9bbf] text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance / Stats Section */}
      <section id="performance" className="py-20 bg-[#0f1e35]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-white">Our </span>
              <span className="text-[#4b9cf5]">Performance</span>
            </h2>
            <p className="mt-4 text-[#7a9bbf] text-base max-w-md">
              Numbers that speak louder than words. Consistent excellence since
              2012.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#0b1528] border border-[#1a2b4a] rounded-2xl p-8 text-center hover:border-[#4b9cf5]/40 transition-all duration-300"
              >
                <div className="text-4xl font-extrabold text-[#4b9cf5] mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-[#7a9bbf] font-medium uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Icons ─────────────────────────────────────────── */
function BriefcaseIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="14" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M14 14V11a2 2 0 012-2h8a2 2 0 012 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="22" x2="32" y2="22" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="44" height="40" viewBox="0 0 44 40" fill="none">
      <rect x="2" y="12" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M28 18h8l4 6v6H28V18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="10" cy="33" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="34" cy="33" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function WarehouseIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="22" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="22" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="22" y="22" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
