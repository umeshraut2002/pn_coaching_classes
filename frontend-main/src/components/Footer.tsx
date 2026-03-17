export function Footer() {
  const year = new Date().getFullYear()

  const links = [
    { name: "Admission Portal", href: "/admission/" },
    { name: "Admin Dashboard", href: "/admin/" },
  ]

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-pn py-8 px-4">
        
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-sm text-slate-600">
          
          {/* Left Section */}
          <div className="text-center md:text-left">
            © {year}{" "}
            <span className="font-medium text-slate-800">
              Pranita Nasare Coaching Classes
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Empowering students with quality education
            </p>
          </div>

          {/* Navigation Links */}
          <nav
            className="flex flex-wrap justify-center md:justify-end gap-4"
            aria-label="Footer Navigation"
          >
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="transition-colors duration-200 hover:text-slate-900 hover:underline"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t pt-4 text-xs text-center text-slate-500">
          Designed for a modern admission experience.
        </div>
      </div>
    </footer>
  )
}

