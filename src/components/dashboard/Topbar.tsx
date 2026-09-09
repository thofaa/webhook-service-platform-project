export function Topbar({ onToggle }: { onToggle: () => void }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-black/5 bg-white/40 px-6 py-4 backdrop-blur-2xl lg:px-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          aria-label="Toggle navigation menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-base-400 transition duration-300 hover:text-black focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-base-500">Admin Panel</span>
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-600 text-xs font-semibold text-white">
        A
      </div>
    </header>
  );
}