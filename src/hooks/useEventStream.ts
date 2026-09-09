import { useCallback, useEffect, useRef, useState } from "react";

export interface EventAttempt {
  id: string;
  status: string;
  timestamp: string;
}

interface UseEventStreamOptions {
  url: string;
  token: string | null;
  autoConnect?: boolean;
}

export function useEventStream({ url, token, autoConnect }: UseEventStreamOptions) {
  const [attempts, setAttempts] = useState<EventAttempt[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const pausedRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (!autoConnect || !token) return;
    const controller = new AbortController();
    controllerRef.current = controller;

    async function connect() {
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        if (!res.ok || !res.body) return;
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("data:") && !pausedRef.current) {
              try {
                const data = JSON.parse(trimmed.slice(5).trim()) as EventAttempt;
                setAttempts((prev) => [...prev.slice(-99), data]);
              } catch {
                // ignore non-JSON stream frames
              }
            }
          }
        }
      } catch {
        // aborted or connection closed
      }
    }

    connect();
    return () => controller.abort();
  }, [url, token, autoConnect]);

  const togglePause = useCallback(() => setIsPaused((p) => !p), []);
  const clearStream = useCallback(() => setAttempts([]), []);

  return { attempts, isPaused, togglePause, clearStream };
}
