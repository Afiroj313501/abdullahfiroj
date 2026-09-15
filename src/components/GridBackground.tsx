// Faint animated grid lines — a handful pulse slowly and independently so
// it reads as "quiet circuit board," not a moving wallpaper. Purely
// decorative: aria-hidden, and it sits behind content via -z-10.
const VERTICAL_LINES = [12, 28, 47, 63, 81];
const HORIZONTAL_LINES = [18, 42, 68, 88];

export default function GridBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden opacity-40">
      {VERTICAL_LINES.map((left, i) => (
        <span
          key={`v-${left}`}
          className="absolute top-0 bottom-0 w-px bg-line"
          style={{
            left: `${left}%`,
            animation: `grid-pulse ${5 + i}s ease-in-out ${i * 0.7}s infinite`,
          }}
        />
      ))}
      {HORIZONTAL_LINES.map((top, i) => (
        <span
          key={`h-${top}`}
          className="absolute left-0 right-0 h-px bg-line"
          style={{
            top: `${top}%`,
            animation: `grid-pulse ${6 + i}s ease-in-out ${i * 0.9}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
