import { menus, type MenuKey } from "./menu.tsx";

type SidebarProps = {
  open: boolean;
  active: MenuKey;
  onSelect: (key: MenuKey) => void;
  onClose: () => void;
};

export function Sidebar({ open, active, onSelect, onClose }: SidebarProps) {
  return (
    <>
      <button
        onClick={onClose}
        aria-label="Close navigation"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-black/5 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-black/5 px-6 py-5">
          <span className="font-bold text-base-900">Syntro</span>
          <span className="rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-semibold text-accent-700">
            Admin
          </span>
        </div>
        <nav className="flex grow flex-col gap-1 overflow-y-auto p-4">
          {menus.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                active === key
                  ? "bg-accent-600 text-white"
                  : "text-base-500 hover:bg-base-100 hover:text-base-900"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}