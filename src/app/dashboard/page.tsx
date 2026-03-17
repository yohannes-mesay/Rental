"use client";

import { Header } from "@/components/dashboard/header";
import {
  Building2,
  FileText,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import {
  properties,
  agreements,
  disputes,
  rentAdjustments,
  analyticsData,
  users,
} from "@/lib/dummy-data";
import { formatCurrency, formatDate, getStatusColor, formatStatus } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const statsCards = [
  {
    title: "Total Properties",
    value: properties.length.toString(),
    change: "+12%",
    changeType: "up" as const,
    icon: Building2,
    color: "bg-blue-500",
    href: "/dashboard/properties",
  },
  {
    title: "Active Agreements",
    value: agreements.filter((a) => a.status === "active").length.toString(),
    change: "+8%",
    changeType: "up" as const,
    icon: FileText,
    color: "bg-emerald-500",
    href: "/dashboard/agreements",
  },
  {
    title: "Open Disputes",
    value: disputes
      .filter((d) => !["resolved", "closed"].includes(d.status))
      .length.toString(),
    change: "-5%",
    changeType: "down" as const,
    icon: AlertTriangle,
    color: "bg-amber-500",
    href: "/dashboard/disputes",
  },
  {
    title: "Pending Adjustments",
    value: rentAdjustments
      .filter((r) => ["pending", "under_review"].includes(r.status))
      .length.toString(),
    change: "+3",
    changeType: "up" as const,
    icon: TrendingUp,
    color: "bg-purple-500",
    href: "/dashboard/rent-adjustment",
  },
  {
    title: "Registered Users",
    value: users.length.toString(),
    change: "+15%",
    changeType: "up" as const,
    icon: Users,
    color: "bg-indigo-500",
    href: "/dashboard/admin/users",
  },
  {
    title: "Pending Verifications",
    value: properties
      .filter((p) => p.status === "pending_verification")
      .length.toString(),
    change: "2 new",
    changeType: "up" as const,
    icon: Clock,
    color: "bg-orange-500",
    href: "/dashboard/admin/verifications",
  },
];

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard Overview" />
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {statsCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}
                >
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                    card.changeType === "up"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {card.changeType === "up" ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mb-1">
                {card.value}
              </p>
              <p className="text-sm text-slate-500">{card.title}</p>
            </Link>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Rental Trends Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Average Rent Trend (ETB)
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={analyticsData.rentalTrends}>
                <defs>
                  <linearGradient id="rentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="averageRent"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#rentGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Agreements per Month */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              New Agreements per Month
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={analyticsData.rentalTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="agreements" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Tables */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Agreements */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                Recent Agreements
              </h3>
              <Link
                href="/dashboard/agreements"
                className="text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {agreements.slice(0, 4).map((agreement) => (
                <div
                  key={agreement.id}
                  className="px-6 py-3.5 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {agreement.propertyTitle}
                    </p>
                    <p className="text-xs text-slate-500">
                      {agreement.tenantName} &middot;{" "}
                      {formatCurrency(agreement.monthlyRent)}/mo
                    </p>
                  </div>
                  <span
                    className={`ml-3 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}
                  >
                    {formatStatus(agreement.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Disputes */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                Recent Disputes
              </h3>
              <Link
                href="/dashboard/disputes"
                className="text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {disputes.slice(0, 4).map((dispute) => (
                <div
                  key={dispute.id}
                  className="px-6 py-3.5 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {dispute.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {dispute.reporterName} &middot;{" "}
                      {formatDate(dispute.createdAt)}
                    </p>
                  </div>
                  <div className="ml-3 flex items-center gap-2">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                        dispute.priority === "critical"
                          ? "bg-red-100 text-red-700"
                          : dispute.priority === "high"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {dispute.priority}
                    </span>
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}
                    >
                      {formatStatus(dispute.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
