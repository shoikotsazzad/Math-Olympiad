import Link from "next/link";

const navCols = [
  {
    title: "Navigation",
    links: [
      { label: "Practice Dashboard", href: "/dashboard" },
      { label: "Activities", href: "/activities" },
      { label: "Resources", href: "/resources" },
      { label: "Hall of Fame", href: "/hall-of-fame" },
      { label: "Registration", href: "/registration" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "UIU Math Club", href: "#" },
      { label: "BdMO Official", href: "#" },
      { label: "Discord Community", href: "#" },
      { label: "Mentor Support", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-auto bg-white">
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden ring-2 ring-[#d97706]/40 shadow-md shadow-[#d97706]/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="UIU CMOR" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-bold text-slate-800 text-xs uppercase tracking-wide">
                UIU Centre for Math
              </span>
              <span className="font-heading font-semibold text-[#d97706] text-[10px] uppercase tracking-wide">
                Olympiad and Research
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            Elevating the standard of Mathematical Excellence.<br />
            <span className="text-[#d97706] italic">&ldquo;Think Deep. Solve Smart&rdquo;</span>
          </p>
        </div>

        {navCols.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-[#d97706] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 py-4">
        <p className="text-center text-xs text-slate-400">
          © 2024 UIU Centre for Math Olympiad and Research. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
