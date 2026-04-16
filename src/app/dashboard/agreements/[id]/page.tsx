"use client";

import { Header } from "@/components/dashboard/header";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import { agreements } from "@/lib/dummy-data";
import { formatCurrency, formatDate, getStatusColor, formatStatus } from "@/lib/utils";
import {
  ArrowLeft,
  FileText,
  User,
  Building2,
  Calendar,
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AgreementDetailPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const role = user?.role || "tenant";
  const params = useParams();
  const agreement = agreements.find((a) => a.id === params.id);

  if (!agreement) {
    return (
      <>
        <Header title="Agreement Not Found" />
        <main className="flex-1 p-6 flex items-center justify-center">
          <p className="text-slate-500">Agreement not found.</p>
        </main>
      </>
    );
  }

  const statusTimeline = [
    {
      label: "Created",
      date: agreement.createdAt,
      done: true,
      icon: FileText,
    },
    {
      label: "Signed",
      date: agreement.signedAt,
      done: !!agreement.signedAt,
      icon: CheckCircle2,
    },
    {
      label: "Verified",
      date: agreement.verifiedAt,
      done: !!agreement.verifiedAt,
      icon: CheckCircle2,
    },
    {
      label: agreement.status === "terminated" ? "Terminated" : "Active",
      date: agreement.verifiedAt || undefined,
      done: agreement.status === "active" || agreement.status === "terminated",
      icon: agreement.status === "terminated" ? XCircle : CheckCircle2,
    },
  ];

  return (
    <>
        <Header title={t("agreements", "agreementDetails")} />
      <main className="flex-1 p-6 overflow-y-auto">
        <Link
          href="/dashboard/agreements"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Agreements
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-400 font-mono mb-1">
                    Agreement #{agreement.id.toUpperCase()}
                  </p>
                  <h2 className="text-xl font-bold text-slate-900">
                    {agreement.propertyTitle}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {agreement.propertyAddress}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agreement.status)}`}
                >
                  {formatStatus(agreement.status)}
                </span>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-0 mb-6">
                {statusTimeline.map((step, i) => (
                  <div key={step.label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.done
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <step.icon className="w-4 h-4" />
                      </div>
                      <p
                        className={`text-xs mt-1 ${step.done ? "text-slate-700 font-medium" : "text-slate-400"}`}
                      >
                        {step.label}
                      </p>
                      {step.date && (
                        <p className="text-[10px] text-slate-400">
                          {formatDate(step.date)}
                        </p>
                      )}
                    </div>
                    {i < statusTimeline.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 ${
                          statusTimeline[i + 1].done
                            ? "bg-emerald-300"
                            : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Rejected Reason */}
              {agreement.status === "rejected" && agreement.terminationReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Agreement Rejected
                    </p>
                    <p className="text-sm text-red-600 mt-0.5">
                      {agreement.terminationReason}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Agreement Details */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Agreement Terms
              </h3>
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Monthly Rent</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {formatCurrency(agreement.monthlyRent)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Advance Payment</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {formatCurrency(agreement.advancePayment)}
                      <span className="text-xs text-slate-400 ml-1">
                        ({Math.round(agreement.advancePayment / agreement.monthlyRent)} months)
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Start Date</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {formatDate(agreement.startDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">End Date</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {formatDate(agreement.endDate)}
                    </p>
                  </div>
                </div>
              </div>

              {agreement.utilities.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-2">
                    Included Utilities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {agreement.utilities.map((u) => (
                      <span
                        key={u}
                        className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Landlord */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Landlord
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {agreement.landlordName}
                  </p>
                  <p className="text-xs text-slate-500">Property Owner</p>
                </div>
              </div>
            </div>

            {/* Tenant */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Tenant
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {agreement.tenantName}
                  </p>
                  <p className="text-xs text-slate-500">Registered Tenant</p>
                </div>
              </div>
            </div>

            {/* Property */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Property
              </h3>
              <Link
                href={`/dashboard/properties/${agreement.propertyId}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 group-hover:text-primary-600 transition-colors">
                    {agreement.propertyTitle}
                  </p>
                  <p className="text-xs text-slate-500">
                    {agreement.propertyAddress}
                  </p>
                </div>
              </Link>
            </div>

            {/* Tenant & Landlord: Extension / Termination */}
            {agreement.status === "active" && (role === "tenant" || role === "landlord") && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  {t("common", "actions")}
                </h3>
                <button className="w-full px-4 py-2.5 text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors">
                  {t("agreements", "requestExtension")}
                </button>
                <button className="w-full px-4 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                  {t("agreements", "requestTermination")}
                </button>
              </div>
            )}

            {/* Authorities only: Approve / Reject */}
            {(agreement.status === "pending_verification" ||
              agreement.status === "pending_dara_verification") &&
              role === "dara_agent" && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  {t("agreements", "verificationActions")}
                </h3>
                <button className="w-full px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
                  {t("agreements", "approveAgreement")}
                </button>
                <button className="w-full px-4 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                  {t("agreements", "rejectAgreement")}
                </button>
              </div>
            )}

            {/* Pending status info for tenant/landlord */}
            {(agreement.status === "pending_verification" ||
              agreement.status === "pending_dara_verification") &&
              (role === "tenant" || role === "landlord") && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">{formatStatus(agreement.status)}</p>
                    <p className="text-xs text-amber-600 mt-1">This agreement is awaiting review and approval by the Authorities.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Compliance Check */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Compliance Check
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  {agreement.advancePayment <=
                  agreement.monthlyRent * 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-xs text-slate-600">
                    Advance &le; 2 months rent
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {(() => {
                    const start = new Date(agreement.startDate);
                    const end = new Date(agreement.endDate);
                    const months =
                      (end.getFullYear() - start.getFullYear()) * 12 +
                      (end.getMonth() - start.getMonth());
                    return months >= 24;
                  })() ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-xs text-slate-600">
                    Minimum 2-year term
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {agreement.signedAt ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-500" />
                  )}
                  <span className="text-xs text-slate-600">
                    Digitally signed by both parties
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
