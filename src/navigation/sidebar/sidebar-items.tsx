import {
  User,
  Users,
  ChartPie,
  UserPen,
  Logs,
  AlertTriangle,
  LucideIcon,
  MessagesSquare,
  Calendar,
  History,
  Home,
  Grid2X2,
  ChartLine,
  ShoppingBag,
  BookA,
  Forklift,
  Mail,
  MessageSquare,
  Kanban,
  ReceiptText,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
} from "lucide-react";

export const ICON_MAP = {
  User,
  Users,
  ChartPie,
  UserPen,
  Logs,
  MessagesSquare,
  Calendar,
  History,
  Home,
  Grid2X2,
  ChartLine,
  ShoppingBag,
  BookA,
  Forklift,
  Mail,
  MessageSquare,
  Kanban,
  ReceiptText,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
};

export const resolveIcon = (iconName: keyof typeof ICON_MAP | undefined): LucideIcon => {
  if (!iconName) return AlertTriangle;
  return ICON_MAP[iconName] || AlertTriangle;
};

export interface NavSubItem {
  title: string;
  path: string;
  icon?: keyof typeof ICON_MAP;
  comingSoon?: boolean;
}

export interface NavMainItem {
  title: string;
  path: string;
  icon?: keyof typeof ICON_MAP;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Dashboards",
        path: "/dashboard",
        icon: "Home",
        subItems: [
          { title: "Default", path: `/dashboard/default`, icon: "ChartPie" },
        ],
      },
    ],
  },
];
