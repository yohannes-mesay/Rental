"use client";

import { Header } from "@/components/dashboard/header";
import { rentAdjustments } from "@/lib/dummy-data";
import { formatCurrency, formatDate, getStatusColor, formatStatus } from "@/lib/utils";
import {
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";

export default function RentAdjustmentPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = rentAdjustments.filter(
    (r) => statusFilter === "all" || r.status === statusFilter
  );

  return (
    <>
      <Header title="Rent Adjustments" />
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Total Requests",
              value: rentAdjustments.length,
              icon: TrendingUp,
              color: "text-slate-900",
            },
            {
              label: "Approved",
              value: rentAdjustments.filter((r) => r.status === "approved")
                .length,
              icon: CheckCircle2,
              color: "text-emerald-600",
            },
            {
              label: "Pending / Review",
              value: rentAdjustments.filter((r) =>
                ["pending", "under_review"].includes(r.status)
              ).length,
              icon: Clock,
              color: "text-amber-600",
            },
            {
              label: "Rejected",
              value: rentAdjustments.filter((r) => r.status === "rejected")
                .length,
              icon: XCircle,
              color: "text-red-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search adjustments..."
              className="bg-transparent text-sm outline-none flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Adjustments List */}
        <div className="space-y-4">
          {filtered.map((adj) => (
            <div
              key={adj.id}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {adj.propertyTitle}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(adj.status)}`}
                    >
                      {formatStatus(adj.status)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Requested by {adj.landlordName} for tenant{" "}
                    {adj.tenantName} &middot;{" "}
                    {formatDate(adj.createdAt)}
                  </p>

                  {/* Rent change visual */}
                  <div className="flex items-center gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-500">Current Rent</p>
                      <p className="text-lg font-bold text-slate-700">
                        {formatCurrency(adj.currentRent)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="w-5 h-5 text-amber-500" />
                      <span
                        className={`text-sm font-bold ${
                          adj.increasePercentage > adj.maxAllowedPercentage
                            ? "text-red-600"
                            : "text-amber-600"
                        }`}
                      >
                        +{adj.increasePercentage}%
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Proposed Rent</p>
                      <p className="text-lg font-bold text-slate-900">
                        {formatCurrency(adj.proposedRent)}
                      </p>
                    </div>
                    <div className="ml-4 px-3 py-1.5 bg-slate-100 rounded-lg">
                      <p className="text-xs text-slate-500">Max Allowed</p>
                      <p className="text-sm font-semibold text-slate-700">
                        {adj.maxAllowedPercentage}%
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600">
                    <strong className="text-slate-700">Reason:</strong>{" "}
                    {adj.reason}
                  </p>

                  {adj.reviewNotes && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-0.5">
                        Review Notes ({formatDate(adj.reviewedAt!)})
                      </p>
                      <p className="text-sm text-slate-700">
                        {adj.reviewNotes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions for pending/under_review */}
                {["pending", "under_review"].includes(adj.status) && (
                  <div className="flex flex-col gap-2 shrink-0">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <TrendingUp className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">
              No rent adjustment requests found
            </p>
          </div>
        )}
      </main>
    </>
  );
}
