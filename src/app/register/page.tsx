"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Eye, EyeOff, UserPlus, Home, User, Globe } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import type { UserRole } from "@/lib/types";

export default function RegisterPage() {
  const router = useRouter();
  const { t, locale, setLocale } = useLanguage();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    password: "", confirmPassword: "", idNumber: "", address: "",
  });

  const roles = [
    { value: "tenant" as UserRole, labelKey: "tenantRole", icon: User, descKey: "tenantRoleDesc" },
    { value: "landlord" as UserRole, labelKey: "landlordRole", icon: Home, descKey: "landlordRoleDesc" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    register(selectedRole, formData.firstName, formData.lastName);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-slate-50 flex">
      <div className="hidden lg:flex lg:w-5/12 bg-primary-700 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWNkgyVjRoMzR6TTIgNTBoMzR2Mkgydi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative z-10 max-w-md text-white">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8"><Building2 className="w-8 h-8" /></div>
          <h2 className="text-3xl font-bold mb-4">{t("auth", "registerSideTitle")}</h2>
          <p className="text-primary-100 leading-relaxed mb-8">{t("auth", "registerSideDesc")}</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-lg py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-9 h-9 bg-primary-700 rounded-lg flex items-center justify-center"><Building2 className="w-5 h-5 text-white" /></div>
              <span className="font-bold text-lg">{t("landing", "brand")}{t("landing", "brandAccent")}</span>
            </div>
            <button onClick={() => setLocale(locale === "en" ? "am" : "en")} className="text-sm font-medium text-slate-700 hover:text-primary-600 px-3 py-1.5 border border-slate-200 rounded-lg flex items-center gap-1.5 ml-auto">
              <Globe className="w-4 h-4" />{locale === "en" ? "አማርኛ" : "English"}
            </button>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{t("auth", "createAccount")}</h1>
          <p className="text-slate-500 mb-6">{t("auth", "registerSubtitle")}</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {roles.map((role) => (
              <button key={role.value} type="button" onClick={() => setSelectedRole(role.value)} className={`p-4 rounded-xl border-2 text-left transition-all ${selectedRole === role.value ? "border-primary-500 bg-primary-50" : "border-slate-200 hover:border-slate-300"}`}>
                <role.icon className={`w-6 h-6 mb-2 ${selectedRole === role.value ? "text-primary-600" : "text-slate-400"}`} />
                <p className={`font-semibold text-sm ${selectedRole === role.value ? "text-primary-700" : "text-slate-700"}`}>{t("auth", role.labelKey)}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t("auth", role.descKey)}</p>
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">{t("auth", "firstName")}</label><input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">{t("auth", "lastName")}</label><input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm" /></div>
            </div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">{t("auth", "email")}</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">{t("auth", "phone")}</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm" placeholder="+251 9XX XXX XXX" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">{t("auth", "idNumber")}</label><input type="text" value={formData.idNumber} onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm" /></div>
            </div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">{t("auth", "address")}</label><input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("auth", "password")}</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">{t("auth", "confirmPassword")}</label><input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm" /></div>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <input type="checkbox" id="terms" className="mt-1 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="terms" className="text-xs text-slate-500">{t("auth", "terms")}</label>
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
              <UserPlus className="w-4 h-4" />{t("auth", "createButton")}
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">{t("auth", "hasAccount")}{" "}<Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">{t("auth", "signInLink")}</Link></p>
        </div>
      </div>
    </div>
  );
}
