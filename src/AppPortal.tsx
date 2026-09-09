import { useEffect, useState } from "react";
import { LiveStream } from "./components/LiveStream";
import { useEventStream } from "./hooks/useEventStream";

export function AppPortal() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security note: In production, verify event.origin here
      if (event.data && event.data.type === "PORTAL_INIT" && event.data.token) {
        setToken(event.data.token);
      }
    };

    window.addEventListener("message", handleMessage);

    if (window.parent !== window) {
      window.parent.postMessage({ type: "PORTAL_READY" }, "*");
    }

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const { attempts, isPaused, togglePause, clearStream } = useEventStream({
    url: "/api/v1/events/stream",
    token,
    autoConnect: !!token,
  });

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0B0F17] text-white flex items-center justify-center">
        <div className="text-center p-8 bg-slate-900 rounded-xl border border-indigo-500/20">
          <div className="animate-pulse flex space-x-2 items-center mb-2 justify-center">
            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full delay-75"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full delay-150"></div>
          </div>
          <p className="text-slate-400 text-sm">
            Waiting for secure session initialization...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-bold mb-6">Webhook Delivery History</h1>
        <LiveStream
          attempts={attempts}
          isPaused={isPaused}
          onTogglePause={togglePause}
          onClearStream={clearStream}
          onSelectAttempt={() => {}}
        />
      </div>
    </div>
  );
}
