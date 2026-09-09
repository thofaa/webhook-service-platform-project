import type { ReactNode } from "react";

export type MenuKey =
  | "dashboard"
  | "article"
  | "documentation"
  | "media"
  | "draft"
  | "profile"
  | "notification";

export type Menu = {
  key: MenuKey;
  label: string;
  icon: ReactNode;
};

const iconProps = {
  className: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
} as const;

export const menus: Menu[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    key: "article",
    label: "Article",
    icon: (
      <svg {...iconProps}>
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    key: "documentation",
    label: "Documentation",
    icon: (
      <svg {...iconProps}>
        <path d="M2 5c0-1.1.9-2 2-2h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H4a2 2 0 0 1-2-2V5z" />
        <path d="M22 5c0-1.1-.9-2-2-2h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7a2 2 0 0 0 2-2V5z" />
      </svg>
    ),
  },
  {
    key: "media",
    label: "Media",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    ),
  },
  {
    key: "draft",
    label: "Draft",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l11 7-11 7-11-7 11-7z" />
        <path d="M5.5 10.5 12 14l6.5-3.5" />
      </svg>
    ),
  },
  {
    key: "profile",
    label: "Profile",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
      </svg>
    ),
  },
  {
    key: "notification",
    label: "Notification",
    icon: (
      <svg {...iconProps}>
        <path d="M6 9a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a2 2 0 0 0 3.4 0" />
      </svg>
    ),
  },
];