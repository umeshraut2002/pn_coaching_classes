import { useState } from "react"
import { NavLink } from "react-router-dom"

const navItems = [
  { name: "Home", to: "/" },
  { name: "Courses", to: "/courses" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-md px-3 py-2 text-sm font-medium transition",
    "focus:outline-none focus:ring-2 focus:ring-brand-500",
    isActive
      ? "bg-brand-50 text-brand-700"
      : "text-slate-700 hover:bg-slate-100",
  ].join(" ")

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container-pn flex items-center justify-between py-4 px-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-600 text-white grid place-items-center font-bold">
            PN
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-slate-900">
              Pranita Nasare
            </div>
            <div className="text-sm text-slate-600">
              Coaching Classes
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main Navigation"
        >
          {navItems.map((item, index) => (
            <NavLink key={index} to={item.to} className={navLinkClass}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <a
            href="/admission/"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
          >
            Apply Admission
          </a>

          <a
            href="/admin/"
            className="hidden sm:inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
          >
            Admin
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Toggle Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}

          <a
            href="/admin/"
            className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Admin Dashboard
          </a>
        </div>
      )}
    </header>
  )
}