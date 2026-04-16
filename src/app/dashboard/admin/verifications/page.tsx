"use client";

import { Header } from "@/components/dashboard/header";
import { useLanguage } from "@/context/language-context";
import { properties, agreements } from "@/lib/dummy-data";
import { formatCurrency, formatDate, getStatusColor, formatStatus } from "@/lib/utils";
import {
  ShieldCheck,
  Building2,
  FileText,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
} from "lucide-react";
import { useState } from "react";

type Tab = "properties" | "agreements";

export default function VerificationsPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>("properties");

  const pendingProperties = properties.filter(
    (p) => p.status === "pending_verification"
  );
  const pendingAgreements = agreements.filter((a) =>
    ["pending_verification", "pending_dara_verification"].includes(a.status)
  );

  return (
    <>
      <Header title={t("admin", "verificationTitle")} />
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500 mb-1">
              Pending Properties
            </p>
            <p className="text-2xl font-bold text-amber-600">
              {pendingProperties.length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500 mb-1">
              Pending Agreements
            </p>
            <p className="text-2xl font-bold text-blue-600">
              {pendingAgreements.length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500 mb-1">
              Verified Today
            </p>
            <p className="text-2xl font-bold text-emerald-600">3</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500 mb-1">
              Rejected Today
            </p>
            <p className="text-2xl font-bold text-red-600">1</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 mb-6 w-fit">
          <button
            onClick={() => setTab("properties")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === "properties"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Building2 className="w-4 h-4 inline mr-1.5" />
            Properties ({pendingProperties.length})
          </button>
          <button
            onClick={() => setTab("agreements")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === "agreements"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-1.5" />
            Agreements ({pendingAgreements.length})
          </button>
        </div>

        {/* Properties Tab */}
        {tab === "properties" && (
          <div className="space-y-4">
            {pendingProperties.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">
                  No properties pending verification
                </p>
              </div>
            )}
            {pendingProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl border border-slate-200 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {property.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}
                        >
                          {formatStatus(property.status)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">
                        {property.address}, {property.subCity} Sub-City
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                        <span>Owner: {property.landlordName}</span>
                        <span>Type: {property.propertyType}</span>
                        <span>
                          Rent: {formatCurrency(property.monthlyRent)}/mo
                        </span>
                        <span>
                          <Clock className="w-3 h-3 inline" /> Submitted:{" "}
                          {formatDate(property.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Verify
                    </button>
                    <button className="px-3 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Agreements Tab */}
        {tab === "agreements" && (
          <div className="space-y-4">
            {pendingAgreements.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">
                  No agreements pending verification
                </p>
              </div>
            )}
            {pendingAgreements.map((agreement) => (
              <div
                key={agreement.id}
                className="bg-white rounded-xl border border-slate-200 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {agreement.propertyTitle}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}
                        >
                          {formatStatus(agreement.status)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">
                        {agreement.landlordName} → {agreement.tenantName}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                        <span>
                          Rent: {formatCurrency(agreement.monthlyRent)}/mo
                        </span>
                        <span>
                          Advance:{" "}
                          {formatCurrency(agreement.advancePayment)} (
                          {Math.round(
                            agreement.advancePayment / agreement.monthlyRent
                          )}{" "}
                          months)
                        </span>
                        <span>
                          Term: {formatDate(agreement.startDate)} –{" "}
                          {formatDate(agreement.endDate)}
                        </span>
                      </div>

                      {/* Compliance flags */}
                      <div className="flex items-center gap-3 mt-2">
                        {agreement.advancePayment <=
                        agreement.monthlyRent * 2 ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-600">
                            <CheckCircle2 className="w-3 h-3" />
                            Advance OK
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-red-600">
                            <XCircle className="w-3 h-3" />
                            Advance exceeds limit
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="px-3 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
