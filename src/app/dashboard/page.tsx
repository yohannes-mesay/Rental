"use client";

import { Header } from "@/components/dashboard/header";
import { useLanguage } from "@/context/language-context";
import {
  Building2,
  FileText,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Home,
  ShieldCheck,
  Gavel,
  BarChart3,
  Settings,
  ScrollText,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import {
  properties,
  agreements,
  disputes,
  rentAdjustments,
  analyticsData,
  users,
  penaltyNotices,
  rentPayments,
} from "@/lib/dummy-data";
import { formatCurrency, formatDate, getStatusColor, formatStatus } from "@/lib/utils";

function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  href,
}: {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium ${
            changeType === "up" ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {changeType === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-sm text-slate-500">{title}</p>
    </Link>
  );
}

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const role = user?.role || "tenant";
  const userId = user?.id || "";

  const myProperties = properties.filter((p) => p.landlordId === userId);
  const myAgreementsAsLandlord = agreements.filter((a) => a.landlordId === userId);
  const myAgreementsAsTenant = agreements.filter((a) => a.tenantId === userId);
  const myDisputes = disputes.filter(
    (d) => d.reporterId === userId || d.respondentId === userId
  );
  const myRentAdjustments = rentAdjustments.filter((r) => r.landlordId === userId);
  const availableProperties = properties.filter((p) => p.status === "available");
  const openDisputes = disputes.filter((d) => !["resolved", "closed"].includes(d.status));
  const pendingRentAdj = rentAdjustments.filter((r) => ["pending", "under_review"].includes(r.status));
  const pendingVerifProps = properties.filter((p) => p.status === "pending_verification");

  const titleKey =
    role === "admin"
      ? "titleAdmin"
      : role === "landlord"
        ? "titleLandlord"
        : role === "tenant"
          ? "titleTenant"
          : "title";

  return (
    <>
      <Header title={t("dashboard", titleKey)} />
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Admin Dashboard: User management, system config, audit logs, roles */}
        {role === "admin" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                title={t("dashboard", "registeredUsers")}
                value={users.length.toString()}
                change="+15%"
                changeType="up"
                icon={Users}
                color="bg-indigo-500"
                href="/dashboard/admin/users"
              />
              <StatCard
                title={t("dashboard", "totalProperties")}
                value={properties.length.toString()}
                change="+12%"
                changeType="up"
                icon={Building2}
                color="bg-blue-500"
                href="/dashboard/admin/users"
              />
              <StatCard
                title={t("dashboard", "activeAgreements")}
                value={agreements.filter((a) => a.status === "active").length.toString()}
                change="+8%"
                changeType="up"
                icon={FileText}
                color="bg-emerald-500"
                href="/dashboard/admin/audit-logs"
              />
              <StatCard
                title={t("dashboard", "openDisputes")}
                value={openDisputes.length.toString()}
                change="-5%"
                changeType="down"
                icon={AlertTriangle}
                color="bg-amber-500"
                href="/dashboard/admin/audit-logs"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Link href="/dashboard/admin/users" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group text-center">
                <Users className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-900">{t("nav", "userManagement")}</p>
                <p className="text-xs text-slate-500 mt-1">{users.length} users</p>
              </Link>
              <Link href="/dashboard/admin/parameters" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group text-center">
                <Settings className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-900">{t("nav", "systemParameters")}</p>
                <p className="text-xs text-slate-500 mt-1">9 parameters</p>
              </Link>
              <Link href="/dashboard/admin/audit-logs" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group text-center">
                <ScrollText className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-900">{t("nav", "auditLogs")}</p>
                <p className="text-xs text-slate-500 mt-1">View activity</p>
              </Link>
              <Link href="/dashboard/admin/roles" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group text-center">
                <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-900">{t("nav", "rolesPermissions")}</p>
                <p className="text-xs text-slate-500 mt-1">4 roles</p>
              </Link>
            </div>
          </>
        )}

        {/* Landlord Dashboard: Register Property, Agreements, Request Rent Adj, Report Violation, Payments, Documents */}
        {role === "landlord" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <StatCard
                title={t("dashboard", "myProperties")}
                value={myProperties.length.toString()}
                change={`${myProperties.filter((p) => p.status === "available").length} ${t("properties", "available")}`}
                changeType="up"
                icon={Building2}
                color="bg-blue-500"
                href="/dashboard/properties"
              />
              <StatCard
                title={t("dashboard", "myAgreements")}
                value={myAgreementsAsLandlord.filter((a) => a.status === "active").length.toString()}
                change={`${myAgreementsAsLandlord.length} total`}
                changeType="up"
                icon={FileText}
                color="bg-emerald-500"
                href="/dashboard/agreements"
              />
              <StatCard
                title={t("dashboard", "myRentAdjustments")}
                value={myRentAdjustments.filter((r) => ["pending", "under_review"].includes(r.status)).length.toString()}
                change={`${myRentAdjustments.length} total`}
                changeType="up"
                icon={TrendingUp}
                color="bg-purple-500"
                href="/dashboard/rent-adjustment"
              />
              <StatCard
                title={t("dashboard", "myDisputes")}
                value={myDisputes.filter((d) => !["resolved", "closed"].includes(d.status)).length.toString()}
                change={`${myDisputes.length} total`}
                changeType="down"
                icon={AlertTriangle}
                color="bg-amber-500"
                href="/dashboard/disputes"
              />
              <StatCard
                title={t("nav", "payments")}
                value={rentPayments.filter((p) => p.recipientId === userId && p.status === "paid").length.toString()}
                change={`${rentPayments.filter((p) => p.recipientId === userId && p.status === "pending").length} pending`}
                changeType="up"
                icon={CreditCard}
                color="bg-teal-500"
                href="/dashboard/payments"
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900">{t("dashboard", "recentAgreements")}</h3>
                  <Link href="/dashboard/agreements" className="text-xs text-primary-600 hover:text-primary-700 font-medium">{t("dashboard", "viewAll")}</Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {myAgreementsAsLandlord.length === 0 ? (
                    <p className="px-6 py-6 text-sm text-slate-500">No agreements yet.</p>
                  ) : (
                    myAgreementsAsLandlord.slice(0, 4).map((agreement) => (
                      <Link key={agreement.id} href={`/dashboard/agreements/${agreement.id}`} className="block px-6 py-3.5 flex items-center justify-between hover:bg-slate-50">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-900 truncate">{agreement.propertyTitle}</p>
                          <p className="text-xs text-slate-500">{agreement.tenantName} &middot; {formatCurrency(agreement.monthlyRent)}/mo</p>
                        </div>
                        <span className={`ml-3 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}>{formatStatus(agreement.status)}</span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900">{t("dashboard", "recentDisputes")}</h3>
                  <Link href="/dashboard/disputes" className="text-xs text-primary-600 hover:text-primary-700 font-medium">{t("dashboard", "viewAll")}</Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {myDisputes.length === 0 ? (
                    <p className="px-6 py-6 text-sm text-slate-500">No disputes.</p>
                  ) : (
                    myDisputes.slice(0, 4).map((dispute) => (
                      <Link key={dispute.id} href={`/dashboard/disputes/${dispute.id}`} className="block px-6 py-3.5 flex items-center justify-between hover:bg-slate-50">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-900 truncate">{dispute.title}</p>
                          <p className="text-xs text-slate-500">{dispute.reporterName} &middot; {formatDate(dispute.createdAt)}</p>
                        </div>
                        <span className={`ml-3 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>{formatStatus(dispute.status)}</span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Tenant Dashboard: Agreements, Report Violation, Track Disputes, Make Payment, Documents */}
        {role === "tenant" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                title={t("dashboard", "myAgreements")}
                value={myAgreementsAsTenant.filter((a) => a.status === "active").length.toString()}
                change={`${myAgreementsAsTenant.length} total`}
                changeType="up"
                icon={FileText}
                color="bg-emerald-500"
                href="/dashboard/agreements"
              />
              <StatCard
                title={t("dashboard", "myDisputes")}
                value={myDisputes.filter((d) => !["resolved", "closed"].includes(d.status)).length.toString()}
                change={`${myDisputes.length} total`}
                changeType="down"
                icon={AlertTriangle}
                color="bg-amber-500"
                href="/dashboard/disputes"
              />
              <StatCard
                title={t("nav", "payments")}
                value={rentPayments.filter((p) => p.payerId === userId && p.status === "pending").length.toString()}
                change={`${rentPayments.filter((p) => p.payerId === userId && p.status === "overdue").length} overdue`}
                changeType="down"
                icon={CreditCard}
                color="bg-teal-500"
                href="/dashboard/payments"
              />
              <StatCard
                title={t("dashboard", "availableProperties")}
                value={availableProperties.length.toString()}
                change="Browse"
                changeType="up"
                icon={Home}
                color="bg-blue-500"
                href="/dashboard/properties"
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900">{t("dashboard", "recentAgreements")}</h3>
                  <Link href="/dashboard/agreements" className="text-xs text-primary-600 hover:text-primary-700 font-medium">{t("dashboard", "viewAll")}</Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {myAgreementsAsTenant.length === 0 ? (
                    <p className="px-6 py-6 text-sm text-slate-500">No agreements yet.</p>
                  ) : (
                    myAgreementsAsTenant.slice(0, 4).map((agreement) => (
                      <Link key={agreement.id} href={`/dashboard/agreements/${agreement.id}`} className="block px-6 py-3.5 flex items-center justify-between hover:bg-slate-50">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-900 truncate">{agreement.propertyTitle}</p>
                          <p className="text-xs text-slate-500">{agreement.landlordName} &middot; {formatCurrency(agreement.monthlyRent)}/mo</p>
                        </div>
                        <span className={`ml-3 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}>{formatStatus(agreement.status)}</span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900">{t("dashboard", "recentDisputes")}</h3>
                  <Link href="/dashboard/disputes" className="text-xs text-primary-600 hover:text-primary-700 font-medium">{t("dashboard", "viewAll")}</Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {myDisputes.length === 0 ? (
                    <p className="px-6 py-6 text-sm text-slate-500">No disputes.</p>
                  ) : (
                    myDisputes.slice(0, 4).map((dispute) => (
                      <Link key={dispute.id} href={`/dashboard/disputes/${dispute.id}`} className="block px-6 py-3.5 flex items-center justify-between hover:bg-slate-50">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-900 truncate">{dispute.title}</p>
                          <p className="text-xs text-slate-500">{dispute.reporterName} &middot; {formatDate(dispute.createdAt)}</p>
                        </div>
                        <span className={`ml-3 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>{formatStatus(dispute.status)}</span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Authorities Dashboard: Verify Agreements, Review Violations, Approve Rent Adj, Dispute Resolution, Analytics, Penalty Notices */}
        {role === "dara_agent" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <StatCard title={t("dashboard", "pendingVerifications")} value={`${pendingVerifProps.length + agreements.filter((a) => ["pending_verification", "pending_dara_verification"].includes(a.status)).length}`} change="To verify" changeType="up" icon={ShieldCheck} color="bg-orange-500" href="/dashboard/admin/verifications" />
              <StatCard title={t("dashboard", "openDisputes")} value={openDisputes.length.toString()} change={`${disputes.filter((d) => d.priority === "critical").length} critical`} changeType="down" icon={AlertTriangle} color="bg-amber-500" href="/dashboard/disputes" />
              <StatCard title={t("dashboard", "pendingAdjustments")} value={pendingRentAdj.length.toString()} change="To review" changeType="up" icon={TrendingUp} color="bg-purple-500" href="/dashboard/rent-adjustment" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Link href="/dashboard/admin/verifications" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow text-center">
                <ShieldCheck className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-900">{t("nav", "verifyAgreements")}</p>
              </Link>
              <Link href="/dashboard/disputes" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow text-center">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-900">{t("nav", "reviewViolations")}</p>
              </Link>
              <Link href="/dashboard/rent-adjustment" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow text-center">
                <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-900">{t("nav", "approveRentAdjustment")}</p>
              </Link>
              <Link href="/dashboard/analytics" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow text-center">
                <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-900">{t("nav", "analytics")}</p>
              </Link>
              <Link href="/dashboard/penalty-notices" className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow text-center">
                <Gavel className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-900">{t("nav", "penaltyNotices")}</p>
              </Link>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900">{t("dashboard", "recentAgreements")}</h3>
                  <Link href="/dashboard/admin/verifications" className="text-xs text-primary-600 hover:text-primary-700 font-medium">{t("dashboard", "viewAll")}</Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {agreements.filter((a) => ["pending_verification", "pending_dara_verification"].includes(a.status)).slice(0, 4).map((agreement) => (
                    <Link key={agreement.id} href={`/dashboard/agreements/${agreement.id}`} className="block px-6 py-3.5 flex items-center justify-between hover:bg-slate-50">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate">{agreement.propertyTitle}</p>
                        <p className="text-xs text-slate-500">{agreement.tenantName} &middot; {formatCurrency(agreement.monthlyRent)}/mo</p>
                      </div>
                      <span className={`ml-3 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}>{formatStatus(agreement.status)}</span>
                    </Link>
                  ))}
                  {agreements.filter((a) => ["pending_verification", "pending_dara_verification"].includes(a.status)).length === 0 && (
                    <p className="px-6 py-6 text-sm text-slate-500">No pending agreements.</p>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900">{t("dashboard", "recentDisputes")}</h3>
                  <Link href="/dashboard/disputes" className="text-xs text-primary-600 hover:text-primary-700 font-medium">{t("dashboard", "viewAll")}</Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {openDisputes.slice(0, 4).map((dispute) => (
                    <Link key={dispute.id} href={`/dashboard/disputes/${dispute.id}`} className="block px-6 py-3.5 flex items-center justify-between hover:bg-slate-50">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate">{dispute.title}</p>
                        <p className="text-xs text-slate-500">{dispute.reporterName} &middot; {formatDate(dispute.createdAt)}</p>
                      </div>
                      <div className="ml-3 flex items-center gap-2">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${dispute.priority === "critical" ? "bg-red-100 text-red-700" : dispute.priority === "high" ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"}`}>{dispute.priority}</span>
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>{formatStatus(dispute.status)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
