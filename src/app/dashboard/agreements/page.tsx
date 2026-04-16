"use client";

import { Header } from "@/components/dashboard/header";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import { agreements } from "@/lib/dummy-data";
import { formatCurrency, formatDate, getStatusColor, formatStatus } from "@/lib/utils";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AgreementsPage() {
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const role = user?.role || "tenant";
  const userId = user?.id || "";

  const roleBasedList =
    role === "landlord"
      ? agreements.filter((a) => a.landlordId === userId)
      : role === "tenant"
        ? agreements.filter((a) => a.tenantId === userId)
        : agreements;

  const filtered = roleBasedList.filter((a) => {
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      a.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.landlordName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const showNewAgreementButton = role === "landlord" || role === "tenant";

  return (
    <>
      <Header title={t("agreements", "title")} />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search agreements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                <option value="active">Active</option>
                <option value="pending_tenant_signature">Pending Signature</option>
                <option value="pending_verification">Pending Verification</option>
                <option value="rejected">Rejected</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>
          {showNewAgreementButton && (
            <Link
              href="/dashboard/agreements/create"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              {t("agreements", "newAgreement")}
            </Link>
          )}
        </div>

        {/* Agreements Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Property
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Parties
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Duration
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Rent
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((agreement) => (
                  <tr
                    key={agreement.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-primary-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate max-w-[200px]">
                            {agreement.propertyTitle}
                          </p>
                          <p className="text-xs text-slate-500 truncate max-w-[200px]">
                            {agreement.propertyAddress}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900">
                        {agreement.landlordName}
                      </p>
                      <p className="text-xs text-slate-500">
                        → {agreement.tenantName}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatDate(agreement.startDate)}</span>
                      </div>
                      <p className="text-xs text-slate-400 ml-5">
                        to {formatDate(agreement.endDate)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">
                        {formatCurrency(agreement.monthlyRent)}
                      </p>
                      <p className="text-xs text-slate-500">
                        Adv: {formatCurrency(agreement.advancePayment)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}
                      >
                        {formatStatus(agreement.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/agreements/${agreement.id}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">No agreements found</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
