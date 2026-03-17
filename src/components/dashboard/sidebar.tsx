"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  FileText,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  DollarSign,
  Bell,
  Users,
  ShieldCheck,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { currentUser } from "@/lib/dummy-data";
import { getInitials } from "@/lib/utils";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "landlord", "tenant", "dara_agent", "system_admin"],
  },
  {
    label: "Properties",
    href: "/dashboard/properties",
    icon: Building2,
    roles: ["admin", "landlord", "tenant", "dara_agent"],
  },
  {
    label: "Agreements",
    href: "/dashboard/agreements",
    icon: FileText,
    roles: ["admin", "landlord", "tenant", "dara_agent"],
  },
  {
    label: "Disputes & Violations",
    href: "/dashboard/disputes",
    icon: AlertTriangle,
    roles: ["admin", "landlord", "tenant"],
  },
  {
    label: "Rent Adjustment",
    href: "/dashboard/rent-adjustment",
    icon: TrendingUp,
    roles: ["admin", "landlord"],
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    roles: ["admin"],
  },
  {
    label: "Pricing Strategy",
    href: "/dashboard/pricing-strategy",
    icon: DollarSign,
    roles: ["admin"],
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    roles: ["admin", "landlord", "tenant", "dara_agent", "system_admin"],
  },
  {
    label: "User Management",
    href: "/dashboard/admin/users",
    icon: Users,
    roles: ["admin", "system_admin"],
  },
  {
    label: "Verifications",
    href: "/dashboard/admin/verifications",
    icon: ShieldCheck,
    roles: ["admin", "dara_agent"],
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
    roles: ["admin", "landlord", "tenant", "dara_agent", "system_admin"],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const filteredNav = navItems.filter((item) =>
    item.roles.includes(currentUser.role)
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col z-40 transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Brand */}
      <div className="h-16 flex items-center gap-2 px-4 border-b border-slate-200 shrink-0">
        <div className="w-9 h-9 bg-primary-700 rounded-lg flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-sm text-slate-900 truncate">
            AA Rental<span className="text-primary-600">Control</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3">
        <ul className="space-y-1">
          {filteredNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary-600" : "text-slate-400")} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-3 space-y-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-xs shrink-0">
            {getInitials(`${currentUser.firstName} ${currentUser.lastName}`)}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <p className="text-xs text-slate-500 capitalize truncate">
                {currentUser.role.replace("_", " ")}
              </p>
            </div>
          )}
          {!collapsed && (
            <Link
              href="/"
              className="text-slate-400 hover:text-red-500 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
