import type { MenuKey } from "./menu.tsx";

export function SectionPlaceholder({ active }: { active: MenuKey }) {
  const title = active.charAt(0).toUpperCase() + active.slice(1);
  return (
    <section className="px-8 py-10 lg:px-12">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-base-900">
        {title}
      </h2>
      <div className="mt-6 flex items-center justify-center rounded-lg border border-dashed ring-1 ring-base-200 bg-base-100/60 min-h-64">
        <p className="text-sm font-medium text-base-400">No content yet</p>
      </div>
    </section>
  );
}