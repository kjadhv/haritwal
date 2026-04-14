"use client";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16 "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
          {/* Left: Text */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
              <span className="text-[#0b1528]">Precision</span>
<br />
<span className="text-[#0b1528]">Moving</span>
              <br />
              <span className="text-[#4b9cf5]">Perfect</span>
              <br />
              <span className="text-[#4b9cf5]">Delivery</span>
            </h1>

            <p className="text-[black] text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Global logistics meets local care. We handle the heavy lifting
              while you focus on the milestone.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className="btn-primary px-8 py-4 text-base"
              >
                Book Free Quote
              </button>
              <button
                onClick={() => scrollTo("services")}
           className="px-8 py-4 text-base font-semibold text-[#7a9bbf] border border-[#1a2b4a] rounded-xl hover:border-[#0b1528] hover:text-[#0b1528] hover:bg-[#0b1528]/2 transition-all duration-200">   Our Services
              </button>
            </div>
          </div>

          {/* Right: Truck Illustration */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <TruckIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

function TruckIllustration() {
  return (
    <svg
      width="460"
      height="320"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[460px]"
    >
      {/* Truck body (cargo area) */}
      <rect
        x="20"
        y="80"
        width="280"
        height="170"
        rx="18"
        fill="#0f1e35"
        stroke="#4b9cf5"
        strokeWidth="3"
      />

      {/* Cab */}
      <path
        d="M300 130 L300 250 L420 250 L420 160 L370 130 Z"
        fill="#f0f4f8"
        stroke="#4b9cf5"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Cab window */}
      <path
        d="M310 140 L310 200 L400 200 L400 165 L362 140 Z"
        fill="#0b1528"
        stroke="#4b9cf5"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Connector between cab and body */}
      <rect x="296" y="130" width="8" height="120" fill="#4b9cf5" />

      {/* Wheels */}
      {/* Rear wheel */}
      <circle cx="100" cy="268" r="38" fill="#0b1528" stroke="#4b9cf5" strokeWidth="3.5" />
      <circle cx="100" cy="268" r="18" fill="#0f1e35" stroke="#4b9cf5" strokeWidth="2" />
      <circle cx="100" cy="268" r="5" fill="#4b9cf5" />

      {/* Front wheel */}
      <circle cx="360" cy="268" r="38" fill="#0b1528" stroke="#4b9cf5" strokeWidth="3.5" />
      <circle cx="360" cy="268" r="18" fill="#0f1e35" stroke="#4b9cf5" strokeWidth="2" />
      <circle cx="360" cy="268" r="5" fill="#4b9cf5" />

      {/* Chassis / undercarriage line */}
      <line x1="20" y1="250" x2="420" y2="250" stroke="#4b9cf5" strokeWidth="3" />

      {/* Door lines on cargo */}
      <line x1="160" y1="82" x2="160" y2="248" stroke="#4b9cf5" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* Haritwal label on cargo */}
      <text
        x="95"
        y="172"
        fill="#4b9cf5"
        fontSize="18"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        letterSpacing="2"
        opacity="0.7"
      >
        HARITWAL
      </text>

      {/* Headlight */}
      <rect x="408" y="195" width="14" height="22" rx="4" fill="#4b9cf5" opacity="0.9" />

      {/* Ground shadow */}
      <ellipse cx="220" cy="314" rx="200" ry="8" fill="#4b9cf5" opacity="0.07" />
    </svg>
  );
}
