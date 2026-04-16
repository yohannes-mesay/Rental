"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Eye, EyeOff, LogIn, Globe, User, Home, ShieldCheck, Gavel } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import type { UserRole } from "@/lib/types";

const LOGIN_ROLES: {
  value: UserRole;
  labelKey: string;
  descKey: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}[] = [
  { value: "tenant", labelKey: "tenantRole", descKey: "tenantRoleDesc", icon: User, color: "blue" },
  { value: "landlord", labelKey: "landlordRole", descKey: "landlordRoleDesc", icon: Home, color: "emerald" },
  { value: "admin", labelKey: "adminRole", descKey: "adminRoleDesc", icon: ShieldCheck, color: "purple" },
  { value: "dara_agent", labelKey: "daraRole", descKey: "daraRoleDesc", icon: Gavel, color: "amber" },
];

const COLOR_MAP: Record<string, { border: string; bg: string; text: string; icon: string }> = {
  blue: { border: "border-blue-500", bg: "bg-blue-50", text: "text-blue-700", icon: "text-blue-600" },
  emerald: { border: "border-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", icon: "text-emerald-600" },
  purple: { border: "border-purple-500", bg: "bg-purple-50", text: "text-purple-700", icon: "text-purple-600" },
  amber: { border: "border-amber-500", bg: "bg-amber-50", text: "text-amber-700", icon: "text-amber-600" },
};

export default function LoginPage() {
  const router = useRouter();
  const { t, locale, setLocale } = useLanguage();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    login(selectedRole);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-slate-50 flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-end justify-start p-12">
        <img
          src="/addis-ababa-skyline.png"
          alt="Addis Ababa skyline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-800/50 to-primary-700/30" />
        <div className="relative z-10 max-w-md text-white">
          <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/20">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-3 drop-shadow-lg">{t("auth", "loginSideTitle")}</h2>
          <p className="text-white/80 leading-relaxed text-sm drop-shadow">{t("auth", "loginSideDesc")}</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-8">
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-9 h-9 bg-primary-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">{t("landing", "brand")}{t("landing", "brandAccent")}</span>
            </div>
            <button onClick={() => setLocale(locale === "en" ? "am" : "en")} className="text-sm font-medium text-slate-700 hover:text-primary-600 px-3 py-1.5 border border-slate-200 rounded-lg flex items-center gap-1.5 ml-auto">
              <Globe className="w-4 h-4" />
              {locale === "en" ? "አማርኛ" : "English"}
            </button>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">{t("auth", "welcomeBack")}</h1>
          <p className="text-slate-500 mb-6">{t("auth", "selectRole")}</p>

          {/* Role selection grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {LOGIN_ROLES.map((role) => {
              const colors = COLOR_MAP[role.color];
              const isSelected = selectedRole === role.value;
              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? `${colors.border} ${colors.bg}`
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <role.icon className={`w-6 h-6 mb-2 ${isSelected ? colors.icon : "text-slate-400"}`} />
                  <p className={`font-semibold text-sm ${isSelected ? colors.text : "text-slate-700"}`}>
                    {t("auth", role.labelKey)}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{t("auth", role.descKey)}</p>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{t("auth", "email")}</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm" placeholder="you@example.com" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">{t("auth", "password")}</label>
                <Link href="#" className="text-xs text-primary-600 hover:text-primary-700">{t("auth", "forgotPassword")}</Link>
              </div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={!selectedRole}
              className={`w-full font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                selectedRole
                  ? "bg-primary-600 hover:bg-primary-700 text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <LogIn className="w-4 h-4" />
              {selectedRole
                ? `${t("auth", "continueAs")} ${t("auth", LOGIN_ROLES.find((r) => r.value === selectedRole)?.labelKey || "")}`
                : t("auth", "signInButton")}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            {t("auth", "noAccount")}{" "}
            <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">{t("auth", "registerHere")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
