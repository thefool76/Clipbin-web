const links = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Get App", href: "#download" }
];

export function Nav() {
  return (
    <header className="nav-shell">
      <div className="nav-inner">
        <a className="brand" href="#top" aria-label="Interlude home">
          Interlude
        </a>
        <nav aria-label="Primary" className="nav-links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
