const paths: Record<string, string> = {
  pray: "M12 3c-.8 2.3-2.6 4.3-3.6 6.4-.9 1.8-1 3.6-.4 5.6l-2.7 3.2M12 3c.8 2.3 2.6 4.3 3.6 6.4.9 1.8 1 3.6.4 5.6l2.7 3.2M12 3v13M9.3 21h5.4",
  people: "M9 8a3 3 0 1 0 0-.01M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 9.5a2.3 2.3 0 1 0 0-.01M16 14.2c2.8.3 5 2.6 5 5.8",
  book: "M3 5.5C5.5 4.5 8.5 4.5 12 6.5c3.5-2 6.5-2 9-1v13c-2.5-1-5.5-1-9 1-3.5-2-6.5-2-9-1zM12 6.5v13",
  heart: "M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z",
  pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  chevL: "M15 6l-6 6 6 6",
  chevR: "M9 6l6 6-6 6",
  play: "M8 5.5v13l11-6.5z",
  phone: "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2",
  card: "M3 6h18v12H3zM3 10h18M7 15h4",
  envelope: "M3 6h18v12H3zM3 7l9 6 9-6",
  cash: "M3 7h18v10H3zM12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM6 10v.01M18 14v.01",
  smile: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 14.5c1.9 2 5.1 2 7 0M9 9.5v.01M15 9.5v.01",
  music: "M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  facebook: "M14 8h2.5V4.5H14c-2.5 0-4 1.6-4 4V11H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V8.6c0-.4.2-.6.5-.6z",
  youtube: "M21 8.5c-.2-1.6-1.2-2.6-2.8-2.8C16 5.5 12 5.5 12 5.5s-4 0-6.2.2C4.2 5.9 3.2 6.9 3 8.5 2.8 10.5 2.8 13.5 3 15.5c.2 1.6 1.2 2.6 2.8 2.8 2.2.2 6.2.2 6.2.2s4 0 6.2-.2c1.6-.2 2.6-1.2 2.8-2.8.2-2 .2-5 0-7zM10.5 15V9l5 3z",
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-6 w-6", strokeWidth = 1.6 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const filled = name === "play" || name === "facebook" || name === "youtube";
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
