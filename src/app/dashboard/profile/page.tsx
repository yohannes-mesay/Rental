"use client";

import { Header } from "@/components/dashboard/header";
import { currentUser } from "@/lib/dummy-data";
import { ROLE_LABELS } from "@/lib/constants";
import { getInitials, formatDate } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  CreditCard,
  Save,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <>
      <Header title="Profile" />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl">
          {/* Profile Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-700 font-bold text-2xl">
                {getInitials(
                  `${currentUser.firstName} ${currentUser.lastName}`
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {currentUser.firstName} {currentUser.lastName}
                </h2>
                <p className="text-sm text-slate-500">
                  {ROLE_LABELS[currentUser.role] || currentUser.role}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <Shield className="w-3 h-3" />
                    Verified Account
                  </span>
                  <span className="text-xs text-slate-400">
                    Member since {formatDate(currentUser.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-6">
              Personal Information
            </h3>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1">
                    <User className="w-4 h-4 text-slate-400" />
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.firstName}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1">
                    <User className="w-4 h-4 text-slate-400" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.lastName}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1">
                  <Mail className="w-4 h-4 text-slate-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={currentUser.email}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1">
                    <Phone className="w-4 h-4 text-slate-400" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue={currentUser.phone}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    ID Number
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.idNumber}
                    disabled
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  Address
                </label>
                <input
                  type="text"
                  defaultValue={currentUser.address}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Role
                </label>
                <input
                  type="text"
                  value={ROLE_LABELS[currentUser.role] || currentUser.role}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Password Change */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Change Password
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <input
                type="password"
                placeholder="Current password"
                className="px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
              />
              <input
                type="password"
                placeholder="New password"
                className="px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="px-5 py-2.5 text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
