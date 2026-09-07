import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { SectionPlaceholder } from "./SectionPlaceholder";
import type { MenuKey } from "./menu.tsx";

export function DashboardApp() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<MenuKey>("dashboard");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSelect = (key: MenuKey) => {
    setActive(key);
    setOpen(false);
  };

  return (
    <div className="min-h-svh bg-base-50">
      <Sidebar
        open={open}
        active={active}
        onSelect={handleSelect}
        onClose={() => setOpen(false)}
      />
      <Topbar onToggle={() => setOpen(!open)} />
      <main className="mx-auto max-w-7xl">
        <SectionPlaceholder active={active} />
      </main>
    </div>
  );
}