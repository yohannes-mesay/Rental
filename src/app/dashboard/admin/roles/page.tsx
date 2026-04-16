"use client";

import { Header } from "@/components/dashboard/header";
import { useLanguage } from "@/context/language-context";
import { users } from "@/lib/dummy-data";
import { Shield, Check, X } from "lucide-react";

type Role = "tenant" | "landlord" | "admin" | "dara_agent";
type PermValue = "yes" | "no" | "view" | "verify";

const ROLES: Role[] = ["tenant", "landlord", "admin", "dara_agent"];

const PERMISSIONS = [
  { key: "manageProperties", labelKey: "manageProperties" },
  { key: "manageAgreements", labelKey: "manageAgreements" },
  { key: "manageDisputes", labelKey: "manageDisputes" },
  { key: "managePayments", labelKey: "managePayments" },
  { key: "manageUsers", labelKey: "manageUsers" },
  { key: "viewAnalytics", labelKey: "viewAnalytics" },
  { key: "verifyDocuments", labelKey: "verifyDocuments" },
  { key: "systemConfig", labelKey: "systemConfig" },
] as const;

const PERM_MATRIX: Record<Role, Record<string, PermValue>> = {
  tenant: {
    manageProperties: "view",
    manageAgreements: "yes",
    manageDisputes: "yes",
    managePayments: "yes",
    manageUsers: "no",
    viewAnalytics: "no",
    verifyDocuments: "no",
    systemConfig: "no",
  },
  landlord: {
    manageProperties: "yes",
    manageAgreements: "yes",
    manageDisputes: "yes",
    managePayments: "yes",
    manageUsers: "no",
    viewAnalytics: "no",
    verifyDocuments: "no",
    systemConfig: "no",
  },
  admin: {
    manageProperties: "yes",
    manageAgreements: "yes",
    manageDisputes: "yes",
    managePayments: "yes",
    manageUsers: "yes",
    viewAnalytics: "yes",
    verifyDocuments: "yes",
    systemConfig: "yes",
  },
  dara_agent: {
    manageProperties: "view",
    manageAgreements: "verify",
    manageDisputes: "yes",
    managePayments: "no",
    manageUsers: "no",
    viewAnalytics: "yes",
    verifyDocuments: "yes",
    systemConfig: "no",
  },
};

function PermIcon({ value }: { value: PermValue }) {
  if (value === "no") {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-slate-100 text-slate-400">
        <X className="w-3.5 h-3.5" />
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-6 rounded ${
        value === "yes"
          ? "bg-emerald-100 text-emerald-600"
          : value === "verify"
          ? "bg-blue-100 text-blue-600"
          : "bg-amber-100 text-amber-600"
      }`}
    >
      <Check className="w-3.5 h-3.5" />
    </span>
  );
}

export default function RolesPermissionsPage() {
  const { t } = useLanguage();

  const getRoleCount = (role: Role) =>
    users.filter((u) => u.role === role).length;

  return (
    <>
      <Header title={t("rolesPerms", "title")} />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((role) => (
            <div
              key={role}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-slate-400" />
                <h2 className="text-base font-semibold text-slate-900">
                  {t("roles", role)}
                </h2>
              </div>
              <p className="text-sm text-slate-500 mb-4">
                {t("rolesPerms", "users")}: {getRoleCount(role)}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {PERMISSIONS.map((p) => (
                  <div
                    key={p.key}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-xs text-slate-600 truncate">
                      {t("rolesPerms", p.labelKey)}
                    </span>
                    <PermIcon
                      value={PERM_MATRIX[role][p.key] ?? "no"}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
