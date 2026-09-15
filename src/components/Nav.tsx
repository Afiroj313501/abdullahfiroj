const SECTIONS = [
  { id: "about", label: "About" },
  { id: "toolkit", label: "Toolkit" },
  { id: "work", label: "Selected Work" },
  { id: "research", label: "Research" },
  { id: "hobbies", label: "Hobbies" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm">
      <a href="/" className="font-display text-sm tracking-tight text-ink">
        Abdullah Firoj
      </a>
      <ul className="hidden md:flex gap-6 text-sm text-ink-muted">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="hover:text-ink transition-colors">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}