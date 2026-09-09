import type { EventAttempt } from "../hooks/useEventStream";

interface LiveStreamProps {
  attempts: EventAttempt[];
  isPaused: boolean;
  onTogglePause: () => void;
  onClearStream: () => void;
  onSelectAttempt: (attempt: EventAttempt) => void;
}

// ponytail: presentation stub — replace with the full LiveStream UI when the
// real component ships. Add a stream backfill/pagination when volume demands.
export function LiveStream({
  attempts,
  isPaused,
  onTogglePause,
  onClearStream,
  onSelectAttempt,
}: LiveStreamProps) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <span className="text-sm font-medium text-slate-300">
          {attempts.length} attempts
        </span>
        <div className="flex gap-2">
          <button
            onClick={onTogglePause}
            className="px-3 py-1 text-xs rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={onClearStream}
            className="px-3 py-1 text-xs rounded-md bg-slate-700 text-slate-200 hover:bg-slate-600"
          >
            Clear
          </button>
        </div>
      </div>
      <ul className="divide-y divide-slate-800 max-h-[28rem] overflow-y-auto">
        {attempts.length === 0 && (
          <li className="px-4 py-6 text-center text-slate-500 text-sm">
            No delivery attempts yet.
          </li>
        )}
        {attempts.map((a) => (
          <li
            key={a.id}
            onClick={() => onSelectAttempt(a)}
            className="px-4 py-3 flex items-center justify-between hover:bg-slate-800 cursor-pointer"
          >
            <span className="text-sm text-slate-300 font-mono">{a.id}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              {a.status}
            </span>
            <span className="text-xs text-slate-500">{a.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
