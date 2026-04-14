export default function Footer() {
  return (
    <footer className="bg-[#070e1c] border-t border-[#1a2b4a]/50 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#4b9cf5] flex items-center justify-center">
            <GridIcon />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            haritwal
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-[#4a6080]">
          © 2024 Haritwal Premium Logistics. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function GridIcon() {
  return (
    <svg
      width="18"
      height="18"
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
