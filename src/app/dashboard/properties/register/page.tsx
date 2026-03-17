"use client";

import { Header } from "@/components/dashboard/header";
import { SUB_CITIES, PROPERTY_TYPES, AMENITIES } from "@/lib/constants";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPropertyPage() {
  const router = useRouter();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/properties");
  };

  return (
    <>
      <Header title="Register Property" />
      <main className="flex-1 p-6 overflow-y-auto">
        <Link
          href="/dashboard/properties"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </Link>

        <div className="max-w-3xl">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Register New Property
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Provide property details for registration and verification by DARA.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-100">
                  Basic Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Property Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                      placeholder="e.g., Modern 2BR Apartment in Bole"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Property Type
                    </label>
                    <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm">
                      <option value="">Select type</option>
                      {PROPERTY_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Monthly Rent (ETB)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                      placeholder="15000"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-100">
                  Location
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                      placeholder="Street address or landmark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Sub-City
                    </label>
                    <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm">
                      <option value="">Select sub-city</option>
                      {SUB_CITIES.map((sc) => (
                        <option key={sc} value={sc}>
                          {sc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Woreda
                    </label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                      placeholder="e.g., 03"
                    />
                  </div>
                </div>
              </div>

              {/* Specs */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-100">
                  Property Details
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Area (m²)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
                      placeholder="85"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-100">
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                        selectedAmenities.includes(amenity)
                          ? "bg-primary-50 border-primary-300 text-primary-700"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm resize-none"
                  placeholder="Describe the property..."
                />
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-100">
                  Ownership Documents
                </h3>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-1">
                    Upload ownership documents for DARA verification
                  </p>
                  <p className="text-xs text-slate-400">
                    PDF, JPG, PNG up to 10MB each
                  </p>
                  <button
                    type="button"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary-600 font-medium hover:text-primary-700"
                  >
                    <Plus className="w-4 h-4" />
                    Browse Files
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Link
                  href="/dashboard/properties"
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
