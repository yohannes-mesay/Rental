"use client";

import { Header } from "@/components/dashboard/header";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import { rentPayments } from "@/lib/dummy-data";
import { RentPayment } from "@/lib/types";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import {
  CreditCard,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Smartphone,
  Landmark,
  Loader2,
} from "lucide-react";
import { useState } from "react";

type PaymentMethodId = "cbe_birr" | "telebirr";

const PAYMENT_METHODS: {
  id: PaymentMethodId;
  label: string;
  amLabel: string;
  icon: typeof Landmark;
  color: string;
  bg: string;
  border: string;
  desc: string;
}[] = [
  {
    id: "cbe_birr",
    label: "CBE Birr",
    amLabel: "ሲቢኢ ብር",
    icon: Landmark,
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-300",
    desc: "Commercial Bank of Ethiopia mobile banking",
  },
  {
    id: "telebirr",
    label: "Telebirr",
    amLabel: "ቴሌብር",
    icon: Smartphone,
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-300",
    desc: "Ethio Telecom mobile money service",
  },
];

type ModalStep = "select" | "confirm" | "processing" | "success";

export default function PaymentsPage() {
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { user } = useAuth();
  const role = user?.role || "tenant";
  const userId = user?.id || "";

  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<RentPayment | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(null);
  const [modalStep, setModalStep] = useState<ModalStep>("select");

  const roleBasedList =
    role === "tenant"
      ? rentPayments.filter((p) => p.payerId === userId)
      : role === "landlord"
        ? rentPayments.filter((p) => p.recipientId === userId)
        : rentPayments;

  const filtered = roleBasedList.filter((p) => {
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      p.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.payerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.recipientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPaid = roleBasedList.filter((p) => p.status === "paid").length;
  const pendingCount = roleBasedList.filter((p) => p.status === "pending").length;
  const overdueCount = roleBasedList.filter((p) => p.status === "overdue").length;
  const totalDue = roleBasedList
    .filter((p) => p.status !== "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const getPayerRecipientDisplay = (p: (typeof rentPayments)[0]) => {
    if (role === "tenant") return p.recipientName;
    if (role === "landlord") return p.payerName;
    return `${p.payerName} → ${p.recipientName}`;
  };

  const openPayModal = (payment: RentPayment) => {
    setSelectedPayment(payment);
    setSelectedMethod(null);
    setModalStep("select");
    setPayModalOpen(true);
  };

  const closePayModal = () => {
    setPayModalOpen(false);
    setSelectedPayment(null);
    setSelectedMethod(null);
    setModalStep("select");
  };

  const handleConfirmPayment = () => {
    setModalStep("processing");
    setTimeout(() => {
      setModalStep("success");
    }, 2200);
  };

  return (
    <>
      <Header title={t("payments", "title")} />
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">{totalPaid}</p>
            <p className="text-xs text-slate-500">
              {t("payments", "totalPaid")}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
            <p className="text-xs text-slate-500">{t("payments", "pending")}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
            <p className="text-xs text-slate-500">{t("payments", "overdue")}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-5 h-5 text-slate-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(totalDue)}
            </p>
            <p className="text-xs text-slate-500">
              {t("payments", "totalDue")}
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t("common", "search")}
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
              <option value="all">{t("common", "all")} {t("common", "status")}</option>
              <option value="paid">{t("payments", "paid")}</option>
              <option value="pending">{t("payments", "pending")}</option>
              <option value="overdue">{t("payments", "overdue")}</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">
                    {t("payments", "property")}
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">
                    {role === "tenant"
                      ? t("payments", "recipient")
                      : role === "landlord"
                        ? t("payments", "payer")
                        : `${t("payments", "payer")} / ${t("payments", "recipient")}`}
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">
                    {t("payments", "amount")}
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">
                    {t("payments", "dueDate")}
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">
                    {t("payments", "paidDate")}
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">
                    {t("payments", "method")}
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">
                    {t("common", "status")}
                  </th>
                  {role === "tenant" && (
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">
                      {t("common", "actions")}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-slate-100 hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3 text-sm text-slate-900">
                      {payment.propertyTitle}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {getPayerRecipientDisplay(payment)}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {formatDate(payment.dueDate)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {payment.paidDate
                        ? formatDate(payment.paidDate)
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {payment.method ? (
                        <PaymentMethodBadge method={payment.method} t={t} />
                      ) : (
                        <span className="text-sm text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}
                      >
                        {t("payments", payment.status)}
                      </span>
                    </td>
                    {role === "tenant" && (
                      <td className="px-4 py-3">
                        {(payment.status === "pending" || payment.status === "overdue") ? (
                          <button
                            onClick={() => openPayModal(payment)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            {t("payments", "payNow")}
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {t("payments", "paid")}
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <CreditCard className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">
                {t("payments", "noPayments")}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Payment Modal */}
      {payModalOpen && selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closePayModal}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {modalStep === "success"
                  ? t("payments", "paymentSuccess")
                  : t("payments", "selectPaymentMethod")}
              </h3>
              {modalStep !== "processing" && (
                <button
                  onClick={closePayModal}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Payment summary */}
            {modalStep !== "success" && (
              <div className="mx-6 mb-5 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">
                  {t("payments", "payingFor")}
                </p>
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  {selectedPayment.propertyTitle}
                </p>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">
                    {t("payments", "dueDate")}: {formatDate(selectedPayment.dueDate)}
                  </span>
                  <span className="text-xl font-bold text-slate-900">
                    {formatCurrency(selectedPayment.amount)}
                  </span>
                </div>
              </div>
            )}

            {/* Step: Select method */}
            {modalStep === "select" && (
              <div className="px-6 pb-6">
                <p className="text-sm text-slate-500 mb-4">
                  {t("payments", "paymentMethodDesc")}
                </p>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? `${method.border} ${method.bg} ring-2 ring-offset-1 ${method.id === "cbe_birr" ? "ring-blue-200" : "ring-green-200"}`
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? method.bg : "bg-slate-100"
                          }`}
                        >
                          {method.id === "cbe_birr" ? (
                            <Landmark className={`w-6 h-6 ${isSelected ? "text-blue-600" : "text-slate-500"}`} />
                          ) : (
                            <Smartphone className={`w-6 h-6 ${isSelected ? "text-green-600" : "text-slate-500"}`} />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <p className={`text-sm font-semibold ${isSelected ? method.color : "text-slate-900"}`}>
                            {locale === "am" ? method.amLabel : method.label}
                          </p>
                          <p className="text-xs text-slate-500">{method.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? method.id === "cbe_birr"
                                ? "border-blue-600 bg-blue-600"
                                : "border-green-600 bg-green-600"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button
                  disabled={!selectedMethod}
                  onClick={() => setModalStep("confirm")}
                  className="w-full mt-5 px-4 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-xl transition-colors"
                >
                  {t("payments", "confirmPayment")}
                </button>
              </div>
            )}

            {/* Step: Confirm */}
            {modalStep === "confirm" && selectedMethod && (
              <div className="px-6 pb-6">
                <div className="text-center mb-5">
                  <div
                    className={`w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
                      selectedMethod === "cbe_birr" ? "bg-blue-100" : "bg-green-100"
                    }`}
                  >
                    {selectedMethod === "cbe_birr" ? (
                      <Landmark className="w-8 h-8 text-blue-600" />
                    ) : (
                      <Smartphone className="w-8 h-8 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600">
                    {locale === "am" ? "ክፍያ ይፈጽሙ በ" : "Paying via"}{" "}
                    <span className="font-bold text-slate-900">
                      {locale === "am"
                        ? PAYMENT_METHODS.find((m) => m.id === selectedMethod)!.amLabel
                        : PAYMENT_METHODS.find((m) => m.id === selectedMethod)!.label}
                    </span>
                  </p>
                </div>

                <div className="space-y-2 mb-5 p-4 bg-slate-50 rounded-xl text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t("payments", "amount")}</span>
                    <span className="font-bold text-slate-900">{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t("payments", "property")}</span>
                    <span className="text-slate-700">{selectedPayment.propertyTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t("payments", "recipient")}</span>
                    <span className="text-slate-700">{selectedPayment.recipientName}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setModalStep("select")}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    {t("payments", "cancel")}
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className={`flex-1 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors ${
                      selectedMethod === "cbe_birr"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {t("payments", "confirmPayment")}
                  </button>
                </div>
              </div>
            )}

            {/* Step: Processing */}
            {modalStep === "processing" && (
              <div className="px-6 pb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary-100 mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                </div>
                <p className="text-sm font-medium text-slate-700">
                  {t("payments", "processing")}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {locale === "am" ? "እባክዎ ይጠብቁ..." : "Please wait..."}
                </p>
              </div>
            )}

            {/* Step: Success */}
            {modalStep === "success" && (
              <div className="px-6 pb-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-lg font-bold text-slate-900 mb-1">
                  {t("payments", "paymentSuccess")}
                </p>
                <p className="text-sm text-slate-500 mb-5">
                  {t("payments", "paymentSuccessDesc")}
                </p>
                <div className="p-4 bg-slate-50 rounded-xl text-sm mb-5 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t("payments", "amount")}</span>
                    <span className="font-bold text-emerald-600">{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t("payments", "method")}</span>
                    <span className="font-medium text-slate-700">
                      {selectedMethod && (locale === "am"
                        ? PAYMENT_METHODS.find((m) => m.id === selectedMethod)!.amLabel
                        : PAYMENT_METHODS.find((m) => m.id === selectedMethod)!.label)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t("payments", "reference")}</span>
                    <span className="font-mono text-xs text-slate-600">
                      {selectedMethod === "cbe_birr" ? "CBE" : "TB"}-{Date.now().toString().slice(-8)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closePayModal}
                  className="w-full px-4 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
                >
                  {t("payments", "close")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function PaymentMethodBadge({
  method,
  t,
}: {
  method: string;
  t: (section: "payments", key: string) => string;
}) {
  const config: Record<string, { bg: string; text: string; icon: typeof Landmark }> = {
    cbe_birr: { bg: "bg-blue-50", text: "text-blue-700", icon: Landmark },
    telebirr: { bg: "bg-green-50", text: "text-green-700", icon: Smartphone },
    bank_transfer: { bg: "bg-slate-50", text: "text-slate-700", icon: Landmark },
    mobile_money: { bg: "bg-purple-50", text: "text-purple-700", icon: Smartphone },
    cash: { bg: "bg-amber-50", text: "text-amber-700", icon: CreditCard },
    check: { bg: "bg-slate-50", text: "text-slate-600", icon: CreditCard },
  };

  const c = config[method] || config.cash;
  const Icon = c.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${c.bg} ${c.text}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {t("payments", method)}
    </span>
  );
}
