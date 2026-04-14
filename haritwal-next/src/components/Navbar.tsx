"use client";

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b1528]/90 backdrop-blur-md border-b border-[#1a2b4a]/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#4b9cf5] flex items-center justify-center">
            <GridIcon />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            haritwal
          </span>
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Services", id: "services" },
            { label: "Performance", id: "performance" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm text-[#8aabcc] hover:text-white font-medium transition-colors duration-200"
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo("contact")}
          className="btn-primary px-5 py-2.5 text-sm"
        >
          Start Moving
        </button>
      </div>
    </nav>
  );
}

function GridIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" />
    </svg>
  );
}
